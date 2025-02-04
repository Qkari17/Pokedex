import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { PokemonFavorite } from "../PokemonFavorite";
import { Power, usePowerContext } from "../Power/PowerContext";
import { PowerButton } from "../Power/PowerSet";
import { ThemeSwitcher } from "../Theme/ThemeSwitcher";

export const PokedexBox = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [favoriteUpdated, setFavoriteUpdated] = useState(false);
  const navigate = useNavigate();
  const { power } = usePowerContext();

  const toggleSelectedPokemon = (id: number) => {
    setSelectedPokemon((prevSelected) => (prevSelected === id ? null : id));
  };

  const handleNavigate = () => {
    if (selectedPokemon) {
      navigate(`/pokemon/${selectedPokemon}`);
      setSelectedPokemon(null);
    } else {
      navigate("/");
    }
  };

  const handleSavePokemonId = () => {
    let pokemonIdToSave: string | null = null;
  
   
    if (selectedPokemon) {
      pokemonIdToSave = selectedPokemon.toString();
    } else {
      
      const pathParts = window.location.pathname.split('/');
      if (pathParts[1] === 'pokemon' && pathParts[2]) {
        pokemonIdToSave = pathParts[2]; 
      }
    }
  
    
    if (!pokemonIdToSave) {
      alert("No Pokemon selected or ID found in the URL!");
      return;
    }
  
    
    if (isNaN(Number(pokemonIdToSave))) {
      alert("Invalid Pokemon ID!");
      return;
    }
  
   
    const savedIds = JSON.parse(localStorage.getItem("savedPokemonIds") || "[]");
  
    if (savedIds.length >= 6) {
      alert("Maximum 6 Pokémon can be added!");
      return;
    }
  
    if (!savedIds.includes(pokemonIdToSave)) {
      savedIds.unshift(pokemonIdToSave);
      localStorage.setItem("savedPokemonIds", JSON.stringify(savedIds));
      setFavoriteUpdated((prev) => !prev);
    
    } else {
      alert("Pokemon ID already saved!");
    }
  };

  const handleRemovePokemon = (id: number) => {
    const savedIds = JSON.parse(
      localStorage.getItem("savedPokemonIds") || "[]"
    );
    const updatedIds = savedIds.filter(
      (savedId: string) => savedId !== id.toString()
    );

    localStorage.setItem("savedPokemonIds", JSON.stringify(updatedIds));
    setFavoriteUpdated((prev) => !prev);
  };

  return (
    <div className="flex justify-center flex-col lg:flex-row">
      <div className=" bg-orange-700 flex border-4 flex-col pt-10 w-[40rem] mt-5 rounded-2xl relative">
        <div className="absolute top-3 right-4">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <div className="flex justify-center border-4 rounded-3xl h-[31rem] w-[31rem] m-auto overflow-y-scroll overflow-hidden bg-white relative dark:bg-stone-700">
          {power === Power.ON ? (
            <Outlet context={{ toggleSelectedPokemon, selectedPokemon }} />
          ) : (
            <div className="h-[31rem] w-[30.6rem] bg-gray-800"></div>
          )}
        </div>

        <div className="flex justify-end m-4 relative">
          <div className="absolute -left-4 top-5">
            <p className="text-black text-3xl font-bold mb-2 ml-2">Power</p>
            <PowerButton></PowerButton>
          </div>
          <div className=" flex h-56  ">
            <div className="flex flex-col items-center">
              <p className="text-black text-3xl font-bold ">Check /</p>
              <p className="text-black text-3xl font-bold ">Home</p>
              <button
                onClick={handleNavigate}
                className={` border-4 w-20 h-20 rounded-full bg-yellow-500 flex justify-center items-center cursor-pointer`}
                disabled={power !== Power.ON}
              >
                {selectedPokemon ? (
                  <svg
                    className={`w-15 rounded-full border-4 bg-amber-400 hover:bg-amber-600 duration-500 ease-in-out  ${
                      power === Power.ON
                        ? "stroke-green-500 bg-gray-700 hover:bg-gray-800 "
                        : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-15 rounded-full border-4 bg-amber-400 hover:bg-amber-600 duration-500 ease-in-out  ${
                      power === Power.ON
                        ? "fill-green-500 bg-gray-700 hover:bg-gray-800 "
                        : ""
                    }`}
                    viewBox="0 -960 960 960"
                  >
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560zm-80 80v-480l320-240 320 240v480H520v-240h-80v240zm320-350" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex flex-col items-center justify-end">
              <p className="text-black text-3xl font-bold ">Fav</p>
              <button
                onClick={handleSavePokemonId}
                className="bg-yellow-500  border-4 w-20 h-20 rounded-full flex justify-center items-center cursor-pointer"
                disabled={power !== Power.ON}
              >
                <svg
                  className={`w-15 rounded-full border-4 bg-amber-400 hover:bg-amber-600 duration-500 ease-in-out  ${
                    power === Power.ON
                      ? "stroke-green-500 bg-gray-700 hover:bg-gray-800 "
                      : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-700 border-t-4 flex-col pt-10 w-[40rem] rounded-2xl relative justify-end h-[45rem] lg:mt-5 ">
        <div className="flex justify-center border-4 rounded-3xl h-[20.7rem] w-[31rem] m-auto overflow-hidden bg-white relative dark:bg-stone-700">
          {power === Power.ON ? (
            <PokemonFavorite
              key={favoriteUpdated.toString()}
              onRemovePokemon={handleRemovePokemon}
            ></PokemonFavorite>
          ) : (
            <div className="h-[20.7rem] w-[30.6rem] bg-gray-800"></div>
          )}{" "}
          <div
            className={`h-[20.7rem] w-[30.6rem] bg-orange-700 absolute transition -bottom-84 duration-1000 ease-in-out border-2 flex justify-center ${
              power === Power.ON ? "" : "-translate-y-84"
            }`}
          >
            <div className="flex flex-col justify-center items-center relative">
              <div className="bg-red-600 border-6 w-60 h-30 rounded-t-full"></div>
              <div className="bg-slate-200 border-6 w-60 h-30 rounded-b-full"></div>
              <div className="absolute inset-0 flex justify-center items-center">
                <div className=" transform bg-slate-200 border-6 w-15 h-15 rounded-full flex justify-center items-center">
                  <div className="w-8 h-8 border-4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-white w-full h-36 bottom-0 z-30 dark:bg-stone-700"></div>
        <div className="absolute bg-white w-full h-56 bottom-2 z-20 border-4  rounded-full dark:bg-stone-700"></div>
      </div>
    </div>
  );
};
