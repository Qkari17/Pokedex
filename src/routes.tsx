import { createBrowserRouter } from "react-router";
import { PokemonPage } from "./Pages/PokemonPage";
import { PokemonDetailsPage } from "./Pages/PokemonDetails";

export const routes = {
  POKEMON_PAGE: {
    path: "/",
  },
  POKEMON_DETAILS: {
    path: "/:id",
  },
};

export const router = createBrowserRouter([
  {
    path: routes.POKEMON_PAGE.path,
    element: <PokemonPage />,
  },
  {
    path: routes.POKEMON_DETAILS.path,
    element: <PokemonDetailsPage />,
  },
]);
