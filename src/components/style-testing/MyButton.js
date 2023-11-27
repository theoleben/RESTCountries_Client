import React from "react";
import { Button } from "@mui/material";
import classes from "./MyButton.module.css";

const MyButton = () => {
  return (
    <div>
      <Button
        className={classes.buttonContainer}
        variant="contained"
        color="primary"
        // sx={{ backgroundColor: "blue" }}
      >
        Mon bouton
      </Button>
    </div>
  );
};

export default MyButton;
