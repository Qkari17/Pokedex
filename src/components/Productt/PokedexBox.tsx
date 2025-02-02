import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
export const PokedexBox = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
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

  return (
    <div>
      <div className=" bg-orange-700 flex border-4 flex-col m-auto pt-10   w-[40rem] mt-5 rounded-2xl">
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
              <button className="bg-yellow-500 hover:bg-yellow-400 border-4 w-20 h-20 rounded-full"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
