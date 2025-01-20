import React, { useEffect, useState } from "react";

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
  
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
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
