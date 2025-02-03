import { Link } from "react-router";
import {
  capitalizeFirstLetter,
  fetchFavorite,
  PokemonDetails,
  typeColors,
} from "../services/function";
import { useQuery } from "@tanstack/react-query";
import Glass from "../img/MagnifyGlass.svg"

interface PokemonFavoriteProps {
  onRemovePokemon: (id: number) => void; // Dodaj prop do obsługi usuwania
}

export const PokemonFavorite = ({ onRemovePokemon }: PokemonFavoriteProps) => {
  const {
    data: pokemon,
    error,
    isLoading,
  } = useQuery<PokemonDetails[]>({
    queryKey: ["favoritePokemon"],
    queryFn: fetchFavorite,
  });

  if (isLoading)
    return (<div className="flex flex-col justify-center items-center gap-4"> <h1 className="font-bold dark:text-slate-200 text-6xl">Loading</h1>
      <div className="flex flex-col justify-center items-center relative animate-spin ease-in-out duration-1000">
        <div className="bg-red-600 border-6 w-60 h-30 rounded-t-full"></div>
        <div className="bg-slate-200 border-6 w-60 h-30 rounded-b-full"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className=" transform bg-slate-200 border-6 w-15 h-15 rounded-full flex justify-center items-center">
            <div className="w-8 h-8 border-4 rounded-full"></div>
          </div>
        </div>
      </div></div>
    );
  if (error) return <p className="font-bold dark:text-slate-200 text-4xl">Error: {error.message}</p>;
  if (!pokemon || pokemon.length === 0) return <div className="flex items-center"><p className="font-bold dark:text-slate-200 text-4xl">No Pokemon added</p></div>;

  return (
    <div>
      <ul className="grid grid-cols-3 gap-1">
        {pokemon.map((pokemon) => (
          <li className="m-auto" key={pokemon.id}>
            <div className="border flex flex-col items-center w-40 h-40 gap-1 p-2 rounded-lg shadow-md bg-slate-200 relative dark:bg-stone-500">
              <button
                className="absolute w-10 h-10 bg-red-500 hover:bg-red-600 top-0 right-0 rounded-bl-3xl border-2 cursor-pointer"
                onClick={() => onRemovePokemon(pokemon.id)}
              >
                <div className="relative flex justify-center items-center">
                  <span className="absolute w-8 h-1 bg-white rotate-45 rounded-2xl dark:bg-slate-300"></span>
                  <span className="absolute w-8 h-1 bg-white -rotate-45 rounded-2xl dark:bg-slate-300"></span>
                </div>
              </button>
              <Link to={`/${pokemon.id}`}>
                <button className="absolute w-10 h-10 bg-blue-500 hover:bg-blue-600 top-0 left-0 flex justify-center items-center rounded-br-3xl border-2 cursor-pointer">
                  {" "}
                  <img src={Glass} alt="Magnifying glass" className="w-8 "></img>
                </button>
              </Link>
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
