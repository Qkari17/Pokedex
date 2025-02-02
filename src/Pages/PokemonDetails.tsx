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

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error.message}</p>;
  if (!pokemon) return <p>Nie znaleziono Pokémon.</p>;

  return (
    <>
      <>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">
            {capitalizeFirstLetter(pokemon.name)} (#{pokemon.id})
          </h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div className="flex gap-2 mt-2">
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
          </div>{" "}
          <h2>Base Stats</h2>
          <div className="grid grid-cols-2 gap-6">
            {pokemon.stats.map((t, index) => (
              <div className="flex flex-col gap-2">
                <div key={index}>
                  {capitalizeFirstLetter(t.stat.name)}: {t.base_stat}
                </div>
                <div
                  className="bg-red-400 h-3"
                  style={{ width: `${Number(t.base_stat) / 2}px` }} 
                ></div>
              </div>
            ))}
          </div>
            </div>
      </>
    </>
  );
};
