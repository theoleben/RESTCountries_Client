import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/styled-engine";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Root from "./pages/Root";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import InteractiveMap from "./pages/InteractiveMap";
// import Statistics from "./pages/Statistics";
// import About from "./pages/About";
import "./App.css";
import countries_all from "./dummy/countries";
import { buildMap, serializeMap } from "./utilities/map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "details/:code",
        element: <DetailsPage />,
      },
      {
        path: "interactive-map",
        element: <InteractiveMap />,
      },
      // {
      //   path: "statistics",
      //   element: <Statistics />,
      // },
      // {
      //   path: "about",
      //   element: <About />,
      // },
    ],
  },
]);

function App() {
  console.log("countries_all: ", countries_all);
  console.log("countries_all.length: ", countries_all.length);

  const countriesMap = buildMap(countries_all);
  console.log("countriesMap:", countriesMap);

  const serializedMap = serializeMap(countriesMap);
  console.log(serializedMap);
  console.log("serializedMap stringify:", JSON.stringify(serializedMap));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f50b5",
        light: "#e8eaf7",
      },
      secondary: {
        main: "#ff5858",
      },
    },
  });

  return (
    // Necessary if we want to override the CSS of MUI
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
