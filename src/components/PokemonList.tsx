import React, { useEffect, useState, useRef, useCallback } from "react";
import { getAllPokemon, getDetailedPokemon } from "../api/api";
import { PokemonDetail } from "../types/pokemon";


const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
    const [page, setPage] = useState<number>(1);
    const observerTarget = useRef<HTMLDivElement | null>(null);
    const LIMIT = 20;
    const addToFavorites = (pokemon: PokemonDetail) => {
        const updatedFavorites = [...favorites, pokemon];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    const isFavorite = (pokemon: PokemonDetail) =>
        favorites.some((fav) => fav.id === pokemon.id);
    const fetchPokemonList = useCallback(async () => {
        try {
            setLoading(true);
            const offset = (page - 1) * LIMIT;
            const results = await getAllPokemon(LIMIT, offset)
            const detailedPokemon = await getDetailedPokemon(results);

            setPokemonList((prevList) => {
                const newPokemon = detailedPokemon.filter(
                    (pokemon) => !prevList.some((prev) => prev.id === pokemon.id)
                );
                return [...prevList, ...newPokemon];
            });
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        } finally {
            setLoading(false);
        }
    }, [page]);



    useEffect(() => {
        fetchPokemonList();
    }, [fetchPokemonList]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, []);
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      }, []);

    return (
        <div className="p-6 ">
            <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>
            <div className="grid  sm:grid-cols-4 gap-6">
                {pokemonList.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-lg"
                    >
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-100 h-100 object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
                        <button
                            onClick={() => addToFavorites(pokemon)}
                            disabled={isFavorite(pokemon)}
                            className={`mt-2 px-4 py-2 rounded ${isFavorite(pokemon)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 text-white"
                                }`}
                        >
                            {isFavorite(pokemon) ? "Added to Favorites" : "Add to Favorites"}
                        </button>
                    </div>
                ))}
            </div>


            <div ref={observerTarget} className="h-10" />

            {loading && (
                <div className="text-center mt-4 text-lg font-semibold">Loading...</div>
            )}
        </div>
    );
};

export default PokemonList;
