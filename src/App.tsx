import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import Favorites from "./components/Favorites";


const App: React.FC = () => {
  return (
    <Router >
      <nav className="p-4 bg-blue-500 text-white flex justify-center space-x-4">
        <Link to="/" className="hover:underline">
          Pokémon List
        </Link>
        <Link to="/favorites" className="hover:underline">
          Favorites
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
