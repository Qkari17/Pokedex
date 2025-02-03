import { useQuery } from "@tanstack/react-query";
import {
  capitalizeFirstLetter,
  fetchPokemons,
  PokemonDetails,
  typeColors,
} from "../services/function";
import { useOutletContext } from "react-router";
export const PokemonPage = () => {
  const { toggleSelectedPokemon, selectedPokemon } = useOutletContext<{ 
    toggleSelectedPokemon: (id: number) => void, 
    selectedPokemon: number | null 
  }>();
  
  const { data, error, isLoading } = useQuery<PokemonDetails[]>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  return (
    <div>
      <ul className="grid grid-cols-3 gap-1">
        {data?.map((pokemon) => (
          <li className="m-auto" key={pokemon.id}>
            <div
              onClick={() => toggleSelectedPokemon(pokemon.id)}
              className={`border flex flex-col items-center w-40 h-40 gap-1 p-2 rounded-lg shadow-md cursor-pointer dark:bg-stone-500 dark:hover:bg-stone-600
                ${selectedPokemon === pokemon.id ? "bg-yellow-300 dark:bg-yellow-800 border-4 " : "bg-slate-200 hover:bg-slate-300"}`}
            >
              <img
                className="h-1/2 w-1/2"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <p className="dark:text-slate-200">
                {pokemon.id}{" "}
                <strong>{capitalizeFirstLetter(pokemon.name)}</strong>
              </p>

              <div className="flex gap-2">
                {pokemon.types.map((t, index) => {
                  const bgColor = typeColors[t.type.name] || "bg-gray-300";
                  return (
                    <div
                      className={`border rounded-3xl border-black py-1 px-3  ${bgColor}`}
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
