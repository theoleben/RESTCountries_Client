import { Box, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import React from "react";

const Hero = () => {
  //   const theme = useTheme();
  //   console.log(theme);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      //   Without the theme property
      sx={{
        backgroundColor: "primary.light",
        height: { xs: "250px", sm: "400px" },
      }}
      //   With the theme property
      //   sx={{ backgroundColor: theme.palette.primary.light }}
    >
      <Box sx={{ width: { sm: "100%" } }}>
        {/* <Button
          color="primary"
          variant="contained"
          // Sx prop has the priority of what is in the theme configuration.
          // Note: we could use a palette property for the border color for example
          sx={{ border: "4px solid", borderColor: "primary.main" }}
        >
          Mon second bouton
        </Button> */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "40px", sm: "60px" },
            marginLeft: { xs: "0", sm: "5%" },
          }}
        >
          ExploreNations
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "25px", sm: "30px" },
            marginLeft: { xs: "0", sm: "5%" },
          }}
        >
          The world is one click away.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
