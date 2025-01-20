import React, { useEffect, useState } from "react";

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
    const removeFromFavorites = (pokemon: PokemonDetail) => {
        const updatedFavorites = favorites.filter(fav=>fav.id!==pokemon.id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    const isFavorite = (pokemon: PokemonDetail) =>
        favorites.some((fav) => fav.id === pokemon.id);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center text-xl font-semibold">
        No favorite Pokémon yet.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Favorite Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.id}
            className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-lg"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
            <button
              onClick={() => removeFromFavorites(pokemon)}
              
              className={`mt-2 px-4 py-2 rounded ${isFavorite(pokemon)
                ? "bg-blue-500 text-white"
                :"bg-gray-400 cursor-not-allowed" 
                }`}
            >
              {isFavorite(pokemon) ? "Remove from Favorites" : "Add to Favorites"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
