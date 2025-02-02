import {
  capitalizeFirstLetter,
  fetchFavorite,
  PokemonDetails,
  typeColors,
} from "../services/function";
import { useQuery } from "@tanstack/react-query";

export const PokemonFavorite = () => {
  const {
    data: pokemon,
    error,
    isLoading,
  } = useQuery<PokemonDetails[]>({
    queryKey: ["favoritePokemon"],
    queryFn: fetchFavorite,
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (error)
    return (
      <p>Błąd: {error instanceof Error ? error.message : "Unknown error"}</p>
    );
  if (!pokemon || pokemon.length === 0) return <p>Nie znaleziono Pokémon.</p>;

  return (
    <div>
      <ul className="grid grid-cols-3 gap-1">
        {pokemon.map((pokemon) => (
          <li className="m-auto" key={pokemon.id}>
            <div className="border flex flex-col items-center w-40 h-40 gap-1 p-2 rounded-lg shadow-md bg-slate-200">
              <img
                className="h-1/2 w-1/2"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <p>
                {pokemon.id}{" "}
                <strong>{capitalizeFirstLetter(pokemon.name)}</strong>
              </p>
              <div className="flex gap-2">
                {pokemon.types.map((t, index) => {
                  const bgColor = typeColors[t.type.name] || "bg-gray-300";
                  return (
                    <div
                      className={`border rounded-3xl border-black py-1 px-3 text-white ${bgColor}`}
                      key={index}
                    >
                      {capitalizeFirstLetter(t.type.name)}
                    </div>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
