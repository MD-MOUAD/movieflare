import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home";
import Movies from "./pages/movies/Movies";
import Shows from "./pages/shows/Shows";
import Search from "./pages/search/Search";
import DetailsPage from "./pages/DetailsPage.jsx";
import WatchList from "./pages/WatchList.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import Protected from "./components/routes/Protected.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
      {
        path: "watchlist",
        element: (<Protected>
          <WatchList />
        </Protected>),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
