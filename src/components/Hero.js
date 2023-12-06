import { Box, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import React from "react";
import "./Hero.css";

const Hero = () => {
  //   const theme = useTheme();
  //   console.log(theme);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="hero"
      //   Without the theme property
      sx={{ backgroundColor: "primary.light" }}
      //   With the theme property
      //   sx={{ backgroundColor: theme.palette.primary.light }}
    >
      <Box sx={{ width: "100%" }}>
        {/* <Button
          color="primary"
          variant="contained"
          // Sx prop has the priority of what is in the theme configuration.
          // Note: we could use a palette property for the border color for example
          sx={{ border: "4px solid", borderColor: "primary.main" }}
        >
          Mon second bouton
        </Button> */}
        <Typography variant="h1">ExploreNations</Typography>
        <Typography variant="h2">
          The world at the end of your mouse (nothing compares to traveling).
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
