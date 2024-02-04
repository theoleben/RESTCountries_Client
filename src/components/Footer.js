import React, { forwardRef } from "react";
import "./Footer.css";
import { Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = forwardRef((props, ref) => {
  // console.log(props);
  const theme = useTheme();
  //   console.log(theme.palette.primary.main);

  return (
    <footer
      style={{ backgroundColor: theme.palette.primary.main }}
      className={`footer-pos${props.positioned ? " absolute" : ""}`}
      ref={ref}
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
});

export default Footer;
