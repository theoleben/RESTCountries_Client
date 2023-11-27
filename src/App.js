import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/styled-engine";
import Root from "./pages/Root";
import Home from "./pages/Home";
import InteractiveMap from "./pages/InteractiveMap";
import Statistics from "./pages/Statistics";
import About from "./pages/About";
import "./App.css";

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
        path: "interactive-map",
        element: <InteractiveMap />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    // Necessary if we want to override the CSS of MUI
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router}></RouterProvider>
    </StyledEngineProvider>
  );
}

export default App;
