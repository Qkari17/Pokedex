import { createBrowserRouter } from "react-router";
import { PokemonPage } from "./Pages/PokemonPage";
import { PokemonDetailsPage } from "./Pages/PokemonDetails";
import { PokedexBox } from "./components/Productt/PokedexBox";

export const routes = {
  POKEMON_PAGE: {
    path: "/",
  },
  POKEMON_DETAILS: {
    path: "/pokemon/:id",
  },
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PokedexBox />, // 🔥 PokedexBox przechowuje stan `selectedPokemon`
    children: [
      {
        path: routes.POKEMON_PAGE.path,
        element: <PokemonPage />,
      },
      {
        path: routes.POKEMON_DETAILS.path,
        element: <PokemonDetailsPage />,
      },
    ],
  },
]);
