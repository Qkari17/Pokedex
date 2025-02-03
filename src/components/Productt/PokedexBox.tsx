import { useState } from "react";
import {  Outlet, useNavigate } from "react-router";
import { PokemonFavorite } from "../PokemonFavorite";

export const PokedexBox = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [favoriteUpdated, setFavoriteUpdated] = useState(false);
  const navigate = useNavigate();
  const toggleSelectedPokemon = (id: number) => {
    setSelectedPokemon((prevSelected) => (prevSelected === id ? null : id));
  };

  
  const handleNavigate = () => {
    if (selectedPokemon) {
      navigate(`/${selectedPokemon}`);
      setSelectedPokemon(null);
    } else {
      navigate("/");
    }
  
  };

  const handleSavePokemonId = () => {
    let pokemonIdToSave: string | null = null;

    
    
     
      pokemonIdToSave = selectedPokemon ? selectedPokemon.toString() : null;
    

    if (pokemonIdToSave) {
   
      const savedIds = JSON.parse(localStorage.getItem("savedPokemonIds") || "[]");

    
      if (!savedIds.includes(pokemonIdToSave)) {
      
        savedIds.unshift(pokemonIdToSave);

      
        if (savedIds.length > 6) {
          savedIds.pop(); 
        }

       
        localStorage.setItem("savedPokemonIds", JSON.stringify(savedIds));
       
        setFavoriteUpdated((prev) => !prev);
        alert("Pokemon ID saved to localStorage!");
      } else {
        alert("Pokemon ID already saved!");
      }
    } else {
      alert("No Pokemon selected or ID found!");
    }
  };

  const handleRemovePokemon = (id: number) => {
    const savedIds = JSON.parse(localStorage.getItem("savedPokemonIds") || "[]");
    const updatedIds = savedIds.filter((savedId: string) => savedId !== id.toString());

    localStorage.setItem("savedPokemonIds", JSON.stringify(updatedIds));
    setFavoriteUpdated((prev) => !prev); // Wymuś renderowanie
    alert("Pokemon removed from favorites!");
  };

  return (
    <div className="flex justify-center ">
      <div className=" bg-orange-700 flex border-4 flex-col pt-10   w-[40rem] mt-5 rounded-2xl">
        <div className="flex justify-center border-4 rounded-3xl h-[31rem] w-[31rem] m-auto overflow-y-scroll bg-white">
          <Outlet context={{ toggleSelectedPokemon, selectedPokemon }} />
        </div>

        <div className="flex justify-end m-4 ">
          <div className=" flex h-56">
            <div className="flex flex-col items-center">
              <p className="text-black text-3xl font-bold ">Check /</p>
              <p className="text-black text-3xl font-bold ">Home</p>
              <button
                onClick={handleNavigate}
                className={` border-4 w-20 h-20 rounded-full ${
                  selectedPokemon
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              ></button>
            </div>
            <div className="flex flex-col items-center justify-end">
              <p className="text-black text-3xl font-bold ">Fav</p>
              <button onClick={handleSavePokemonId} className="bg-yellow-500 hover:bg-yellow-400 border-4 w-20 h-20 rounded-full"></button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-700 border-t-4 flex-col pt-10 w-[40rem] mt-5 rounded-2xl relative justify-end">
      <div className="flex justify-center border-4 rounded-3xl h-[20.7rem] w-[31rem] m-auto overflow-y-scroll bg-white">
          <PokemonFavorite key={favoriteUpdated.toString()} onRemovePokemon={handleRemovePokemon}></PokemonFavorite>
        </div>
        <div className="absolute bg-white w-full h-36 bottom-0 z-10 "></div>
        <div className="absolute bg-white w-full h-56 bottom-10 border-4  rounded-full"></div>
      </div>
    </div>
  );
};
