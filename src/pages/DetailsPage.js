import React, { useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";

// import DUMMY_OBJ from "../dummy/country";
// import COUNTRIES_ALL from "../dummy/countries";
// import Dummy from "../components/Dummy";
import TableComponent from "../components/TableComponent";
import {
  codesMapObject,
  geographyMapObject,
  globalDataMapObject,
  namesMapObject,
} from "../utilities/formatting";
import "./DetailsPage.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCountryByCode } from "../redux/slices/countriesSlice";

const DetailsPage = () => {
  const params = useParams();
  // console.log(params.code);

  const country = useSelector((state) =>
    selectCountryByCode(state, params.code)
  );
  // console.log(country);

  // Names
  let namesMap = new Map();
  // Codes
  let codesMap = new Map();
  // Global Data
  let globalDataMap = new Map();
  // Geography
  let geographyMap = new Map();
  if (country !== undefined) {
    namesMap = namesMapObject(country);
    codesMap = codesMapObject(country);
    globalDataMap = globalDataMapObject(country);
    geographyMap = geographyMapObject(country);
  }

  useEffect(() => {
    // console.log("useEffect");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <Dummy /> */}
      {country && (
        <Box
          sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
        >
          <Paper sx={{ maxWidth: "400px" }}>
            <Box
              component="img"
              sx={{
                height: "auto",
                width: "100%",
                borderRadius: "4px",
              }}
              alt={country.flags.alt}
              src={
                country.name.common === "Afghanistan"
                  ? "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Afghanistan_%28Colored_Emblem%29.svg"
                  : country.flags.svg
              }
            />
          </Paper>
        </Box>
      )}

      {/* GRID */}
      <Grid
        container
        spacing={0}
        justifyContent="space-evenly"
        sx={{ mb: "50px" }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{ mx: { xs: "10%", sm: "15%", md: "0px" } }}
        >
          <TableComponent title="Names" data={namesMap} />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ mx: { xs: "10%", sm: "15%", md: "0px" } }}
        >
          <TableComponent title="Codes" data={codesMap} />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ mx: { xs: "10%", sm: "15%", md: "0px" } }}
        >
          <TableComponent title="Geography" data={geographyMap} />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ mx: { xs: "10%", sm: "15%", md: "0px" } }}
        >
          <TableComponent title="Global data" data={globalDataMap} />
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsPage;
