import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { router } from "./routes";
import { RouterProvider } from "react-router";
import { PowerContextProvider } from "./components/Power/PowerContext";
import { ThemeContextProvider } from "./components/Theme/ThemeContext";

// Tworzymy instancję QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <PowerContextProvider><ThemeContextProvider>
        <RouterProvider router={router} /></ThemeContextProvider>
      </PowerContextProvider>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
