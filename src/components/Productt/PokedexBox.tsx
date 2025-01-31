import { PokemonPage } from "../../Pages/PokemonPage";

export const PokedexBox = () => {
  return (
    <div>
      <div className="bg bg-red-600 flex m-auto pt-10 pb-72  w-[40rem] mt-5">
        <div className="flex justify-center h-[31rem] w-[31rem] m-auto border overflow-y-scroll bg-white">
          <PokemonPage></PokemonPage>
        </div>
      </div>
    </div>
  );
};
