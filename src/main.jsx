import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home";
import Movies from "./pages/movies/Movies";
import Shows from "./pages/shows/Shows";
import DetailsPage from "./pages/DetailsPage.jsx";
import WatchList from "./pages/WatchList.jsx";
import Favorite from "./pages/Favorite.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import Protected from "./components/routes/Protected.jsx";
import HomeRedirection from "./components/HomeRedirection.js";
import GenrePage from "./pages/GenrePage.jsx";
import DetailsPageVerifier from "./components/routes/DetailsPageVerifier.jsx";
import theme from "../theme.js";
import "./i18n";

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
        path: "/:type/:id",
        element: (
          <DetailsPageVerifier>
            <DetailsPage />
          </DetailsPageVerifier>
        ),
      },
      {
        path: "/genre/:id",
        element: <GenrePage />,
      },
      {
        path: "watchlist",
        element: (
          <Protected>
            <WatchList />
          </Protected>
        ),
      },
      {
        path: "favorite",
        element: (
          <Protected>
            <Favorite />
          </Protected>
        ),
      },
    ],
    // errorElement: <HomeRedirection />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
