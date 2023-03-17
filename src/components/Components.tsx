import { useEffect, useState } from 'react';

type Pokemon = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
};

export function Content() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/1`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {pokemon ? (
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Content;
