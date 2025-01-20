import { Pokemon } from "../types/pokemon";

export async function getAllPokemon(limit:number,offset:number){
     
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        const results: Pokemon[] = data.results;
        return results
}

export async function getDetailedPokemon( results:Pokemon[]){ 
    return  await Promise.all(
    results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const details = await detailResponse.json();
        return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
        };
    })
)}