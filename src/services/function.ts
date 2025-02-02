interface PokemonBasic {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: {base_stat:string , stat: {name: string}}[];
  sprites: { front_default: string };
}
export const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  fighting: "bg-orange-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  bug: "bg-lime-500",
  rock: "bg-gray-600",
  ghost: "bg-violet-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
  normal: "bg-gray-300",
};


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
        stats: pokemonData.stats
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
