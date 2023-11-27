import { Button } from "@mui/material";
import React from "react";
// import classes from "./MySecondButton.module.css";

const MySecondButton = () => {
  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        // Sx prop has the priority of what is in the theme configuration.
        // Note: we could use a palette property for the border color for example
        sx={{ border: "4px solid", borderColor: "secondary.dark" }}
      >
        Mon second bouton
      </Button>
    </div>
  );
};

export default MySecondButton;
