import { useQuery } from "@tanstack/react-query";
import {
  capitalizeFirstLetter,
  fetchPokemons,
  PokemonDetails,
} from "../services/function";

export const PokemonPage = () => {
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
            <div className="bg-slate-200 border flex flex-col items-center w-40 h-40 gap-1">
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
                {pokemon.types.map((t, index) => (
                  <div className="border py-0.5 px-2" key={index}>
                    {capitalizeFirstLetter(t.type.name)}
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
