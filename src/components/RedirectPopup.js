import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const RedirectPopup = (props) => {
  // console.log(props);
  return (
    <div
      style={{
        display: `${props.visible ? "block" : "none"}`,
        maxWidth: "150px",
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
