interface PokemonBasic {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export const fetchPokemons = async (): Promise<PokemonDetails[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!response.ok) throw new Error("Błąd w pobieraniu danych");
  const data: { results: PokemonBasic[] } = await response.json();

  const detailedPokemons: PokemonDetails[] = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData: PokemonDetails = await pokemonResponse.json();
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types,
        sprites: pokemonData.sprites,
      };
    })
  );

  return detailedPokemons;
};

export const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const fetchPokemonById = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
      throw new Error("Błąd pobierania danych");
  }
  return res.json();
};
