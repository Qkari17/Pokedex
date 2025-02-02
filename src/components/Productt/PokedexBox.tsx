import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
export const PokedexBox = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleSelectedPokemon = (id: number) => {
    setSelectedPokemon((prevSelected) => (prevSelected === id ? null : id));
  };


  return (
    <div>
      <div className=" bg-orange-700 flex border-4 flex-col m-auto pt-10   w-[40rem] mt-5 rounded-2xl">
        <div className="flex justify-center border-4 rounded-3xl h-[31rem] w-[31rem] m-auto overflow-y-scroll bg-white">
          <Outlet context={{ toggleSelectedPokemon, selectedPokemon }} />
        </div>
        <div className="py-10"></div>
        <div className="flex justify-end m-4 ">
          <div className=" flex h-40">
            <div>
              <button
                onClick={() =>
                  selectedPokemon && navigate(`/${selectedPokemon}`)
                }
                disabled={!selectedPokemon}
                className={` border-4 w-20 h-20 rounded-full ${
                  selectedPokemon
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              ></button>
            </div>
            <div className="flex items-end">
              <button className="bg-yellow-500 hover:bg-yellow-400 border-4 w-20 h-20 rounded-full"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
