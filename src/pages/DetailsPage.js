import React from "react";
import { Box, Paper, styled } from "@mui/material";

import GridComponent from "../components/GridComponent";
import DUMMY_OBJ from "../dummy/country";
// import COUNTRIES_ALL from "../dummy/countries";
import Dummy from "../components/Dummy";
import TableComponent from "../components/TableComponent";
import "./DetailsPage.css";

const DetailsPage = () => {
  const namesMap = new Map();

  namesMap.set("Common", DUMMY_OBJ.name.common);
  namesMap.set("Official", DUMMY_OBJ.name.official);

  const codesMap = new Map();
  codesMap.set("ISO 3166-1 alpha-2", DUMMY_OBJ.cca2);
  codesMap.set("ISO 3166-1 alpha-3", DUMMY_OBJ.cca3);
  codesMap.set("ISO 3166-1 numeric", DUMMY_OBJ.ccn3);
  codesMap.set("ISO 3166-1 independence status", DUMMY_OBJ.independent);

  const globalDataMap = new Map();
  globalDataMap.set("Population", DUMMY_OBJ.population);

  return (
    <>
      <Dummy />
      <Paper sx={{ width: "300px", height: "205px" }}>
        <Box
          component="img"
          sx={{
            height: "auto",
            width: "100%",
            borderRadius: "4px",
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
      </Paper>

      {/* GRID */}
      {/* Names */}
      <GridComponent title="Names" data={namesMap} />
      {/* Codes */}
      <GridComponent title="Codes" data={codesMap} />
      {/* Global data */}
      <GridComponent title="Global Data" data={globalDataMap} />

      {/* TABLE */}
      <TableComponent title="Names" data={namesMap} />
    </>
  );
};

export default DetailsPage;
