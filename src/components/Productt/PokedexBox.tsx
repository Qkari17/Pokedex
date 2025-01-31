import { RouterProvider } from "react-router/dom";

import { router} from "../../routes";
export const PokedexBox = () => {
  return (
    <div>
      <div className=" bg-orange-700 flex border-4 flex-col m-auto pt-10   w-[40rem] mt-5 rounded-2xl">
        <div className="flex justify-center border-4 rounded-3xl h-[31rem] w-[31rem] m-auto overflow-y-scroll bg-white">
        <RouterProvider router={router}/>
        </div>
        <div className="py-10"></div>
        <div className="flex justify-end m-4 ">
          <div className=" flex h-40">
            <div>
              <button className="bg-red-700 hover:bg-red-600 border-4 w-20 h-20 rounded-full"></button>
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
