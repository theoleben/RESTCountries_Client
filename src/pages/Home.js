import React from "react";
import { Link, Switch } from "@mui/material";
import MyButton from "../components/style-testing/MyButton";
import MySecondButton from "../components/style-testing/MySecondButton";
import MySlider from "../components/style-testing/MySlider";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <MyButton />
      <MySecondButton />
      <MySlider />
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          console.info("I'm a button.");
        }}
      >
        Button Link
      </Link>
      <Switch />
    </>
  );
};

export default Home;
