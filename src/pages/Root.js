import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Root = () => {
  return (
    <>
      <MainNavigation />
      <div>Root</div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
