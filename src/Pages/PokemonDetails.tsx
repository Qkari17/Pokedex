import {  Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter, fetchPokemonById, PokemonDetails } from "../services/function";
import { routes } from "../routes";


export const PokemonDetailsPage = () => {
    const { id } = useParams<{ id: string }>(); // Get the Pokémon ID from URL

    const { data: pokemon, error, isLoading } = useQuery<PokemonDetails>({
        queryKey: ["pokemon", id],
        queryFn: () => fetchPokemonById(id!), // Fetch data dynamically
    });

    if (isLoading) return <p>Ładowanie...</p>;
    if (error) return <p>Błąd: {error.message}</p>;
    if (!pokemon) return <p>Nie znaleziono Pokémon.</p>;

    return (
        <><>
        <div className="flex flex-col items-center">
            
            <h1 className="text-2xl font-bold">
                {capitalizeFirstLetter(pokemon.name)} (#{pokemon.id})
            </h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="flex gap-2 mt-2">
                {pokemon.types.map((t, index) => (
                    <div className="border py-1 px-3 bg-gray-300" key={index}>
                        {capitalizeFirstLetter(t.type.name)}
                    </div>
                ))}
            </div>
            <Link className="text-blue-500 text-4xl mt-5" to={routes.POKEMON_PAGE.path}>HOME</Link>
            
        </div></>
        </>
    );
};