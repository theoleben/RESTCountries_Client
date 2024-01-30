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
// import ReactControl from "./pages/ReactLeaflet/ReactControl/ReactControl";

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
        // element: <ReactControl />,
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
