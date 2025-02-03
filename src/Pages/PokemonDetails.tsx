import {  useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  capitalizeFirstLetter,
  fetchPokemonById,
  PokemonDetails,
  typeColors,
} from "../services/function";


export const PokemonDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Get the Pokémon ID from URL

  const {
    data: pokemon,
    error,
    isLoading,
  } = useQuery<PokemonDetails>({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemonById(id!), // Fetch data dynamically
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
  if (!pokemon) return <p className="font-bold dark:text-slate-200 text-4xl">Pokemon not found .</p>;

  return (
    <>
             <div className="flex flex-col items-center gap-2 dark:bg-stone-500 w-full">
          <h1 className="text-2xl font-bold dark:text-slate-200">
            {capitalizeFirstLetter(pokemon.name)} (#{pokemon.id})
          </h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div className="flex gap-2 mt-2">
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
          </div>{" "}
          <h2 className="text-2xl dark:text-slate-200">Base Stats</h2>
          <div className="grid grid-cols-2 gap-6">
            {pokemon.stats.map((t, index) => (
              <div className="flex flex-col gap-2">
                <div className="dark:text-slate-200" key={index}>
                  {capitalizeFirstLetter(t.stat.name)}: {t.base_stat}
                </div>
                <div
                  className="bg-red-400 dark:bg-green-400 h-3"
                  style={{ width: `${Number(t.base_stat) / 2}px` }} 
                ></div>
              </div>
            ))}
          </div>
            </div>
      
    </>
  );
};
