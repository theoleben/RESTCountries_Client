import React from "react";
import "./Footer.css";
import { Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  //   console.log(theme.palette.primary.main);

  const location = useLocation();
  console.log(location);
  let css = {};
  if (location.pathname === "/interactive-map") {
    css = { position: "absolute", bottom: "0" };
  }

  return (
    <footer
      style={{
        ...css,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {/* <Typography sx={{ backgroundColor: "primary.main" }}> */}
      <Typography sx={{ color: theme.palette.primary.contrastText }}>
        Created by
      </Typography>
      <Link
        href="https://github.com/theoleben/RESTCountries_Client"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ ml: "5px" }}
        color="secondary"
      >
        theoleben
      </Link>
    </footer>
  );
};

export default Footer;
