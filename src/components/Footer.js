import React from "react";
import "./Footer.css";
import { Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  //   console.log(theme.palette.primary.main);
  return (
    <footer style={{ backgroundColor: theme.palette.primary.main }}>
      {/* <Typography sx={{ backgroundColor: "primary.main" }}> */}
      <Typography sx={{ color: theme.palette.primary.contrastText }}>
        Created by
      </Typography>
      <Link
        href="https://github.com/theoleben"
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
