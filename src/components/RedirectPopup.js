import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const RedirectPopup = (props) => {
  // console.log(props);
  return (
    <div
      style={{
        display: `${props.visible ? "block" : "none"}`,
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: "10000",
      }}
    >
      <Link to={`/details/${props.country.code}`}>
        <Button variant="contained">
          {`Voir la fiche du pays ${props.country.name}`}
        </Button>
      </Link>
    </div>
  );
};

export default RedirectPopup;
