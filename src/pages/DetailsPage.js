import React from "react";
import { Box, Grid, Paper } from "@mui/material";

// import GridComponent from "../components/GridComponent";
// import DUMMY_OBJ from "../dummy/country";
import COUNTRIES_ALL from "../dummy/countries";
// import Dummy from "../components/Dummy";
import TableComponent from "../components/TableComponent";
import { commaFormatting } from "../utilities/formatting";
import "./DetailsPage.css";

const DetailsPage = () => {
  // console.log("dummy country:", COUNTRIES_ALL[2]);
  // const temp = COUNTRIES_ALL[2];
  // const temp = COUNTRIES_ALL.find(
  //   (element) => element.name.common === "Namibia"
  // );
  // const temp = COUNTRIES_ALL.find((element) => element.continents.length > 1);
  // console.log(temp);
  // const temp = COUNTRIES_ALL.find((element) => {
  //   return element.hasOwnProperty("timezones") && element.timezones.length > 1;
  // });
  // console.log(temp);

  const temp = COUNTRIES_ALL.find((element) => {
    return element.hasOwnProperty("languages") &&
      Object.entries(element.languages).length > 1
      ? true
      : false;
  });
  // console.log(temp);

  // NAMES
  const nativeNames = new Map();
  const tab = temp.name.nativeName;
  // console.log("tab:", tab);

  for (const [key, value] of Object.entries(tab)) {
    // console.log("key:", key);
    // console.log("value:", value);
    // console.log("value.official:", value.official);
    // console.log("value.common:", value.common);
    // console.log("language displayed:", temp.languages[key]);
    nativeNames.set(`${temp.languages[key]} (Common)`, value.common);
    nativeNames.set(`${temp.languages[key]} (Official)`, value.official);
  }

  // console.log(nativeNames);

  const namesMap = new Map();

  namesMap.set("Common", temp.name.common);
  namesMap.set("Official", temp.name.official);
  const nativeNameTitle = nativeNames.size > 1 ? "Native names" : "Native name";
  namesMap.set(nativeNameTitle, nativeNames);

  // Codes
  const codesMap = new Map();
  codesMap.set("ISO 3166-1 alpha-2", temp.cca2);
  codesMap.set("ISO 3166-1 alpha-3", temp.cca3);
  codesMap.set("ISO 3166-1 numeric", temp.ccn3);
  codesMap.set("ISO 3166-1 independence status", temp.independent);
  if (!temp.hasOwnProperty("fifa")) {
    codesMap.set("Fifa code", "-");
  } else {
    codesMap.set("Fifa code", temp.fifa);
  }

  if (!temp.hasOwnProperty("cioc")) {
    codesMap.set("International Olympic Committee code", "-");
  } else {
    codesMap.set("International Olympic Committee code", temp.cioc);
  }

  // Global Data
  const globalDataMap = new Map();
  globalDataMap.set("Population", temp.population);

  const currenciesMap = new Map();
  let idx = 0;
  for (const [key, value] of Object.entries(temp.currencies)) {
    // console.log("key:", key);
    // console.log("value:", value);
    // console.log(`${key} / ${value.name} / ${value.symbol}`);
    currenciesMap.set(
      `currency_${idx}`,
      `${key} / ${value.name} / ${value.symbol}`
    );
    idx++;
  }
  // console.log(currenciesMap);
  const title = currenciesMap.size === 1 ? "Currency" : "Currencies";
  globalDataMap.set(title, currenciesMap);

  globalDataMap.set(
    "Start of the week",
    temp.startOfWeek.charAt(0).toUpperCase() + temp.startOfWeek.slice(1)
  );
  globalDataMap.set(
    "Car side",
    temp.car.side.charAt(0).toUpperCase() + temp.car.side.slice(1)
  );

  const langaguesMap = new Map();
  for (const [key, value] of Object.entries(temp.languages)) {
    langaguesMap.set(`${key}`, value);
  }

  const languagesTitle = langaguesMap.size > 1 ? "Languages" : "Language";
  globalDataMap.set(languagesTitle, langaguesMap);

  // Geography
  const geographyMap = new Map();
  const continentsStr = commaFormatting(temp.continents);
  const capitalsStr = commaFormatting(temp.capital);
  const timeZonesStr = commaFormatting(temp.timezones);
  const latlgnStr = commaFormatting(temp.latlng);
  const continentsTitle =
    temp.continents.length > 1 ? "Continents" : "Continent";
  const capitalTitle = temp.capital.length > 1 ? "Capitals" : "Capital";
  const timezoneTitle = temp.timezones.length > 1 ? "Timezones" : "Timezone";

  geographyMap.set(continentsTitle, continentsStr);
  geographyMap.set("Region", temp.region);
  geographyMap.set("Subregion", temp.subregion);
  geographyMap.set(capitalTitle, capitalsStr);
  geographyMap.set(timezoneTitle, timeZonesStr);
  geographyMap.set("Lat/Long", latlgnStr);
  geographyMap.set("Area (km²)", temp.area);
  geographyMap.set("Landlocked", temp.landlocked);

  if (!temp.hasOwnProperty("landborder")) {
    geographyMap.set("Land borders", "-");
  } else {
    const landbordersStr = commaFormatting(temp.landborder);
    geographyMap.set("Land borders", landbordersStr);
  }

  return (
    <>
      {/* <Dummy /> */}
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
            alt={temp.flags.alt}
            src={temp.flags.svg}
          />
        </Paper>
      </Box>

      {/* GRID */}
      {/* Names */}
      {/* <GridComponent title="Names" data={namesMap} /> */}
      {/* Codes */}
      {/* <GridComponent title="Codes" data={codesMap} /> */}
      {/* Global data */}
      {/* <GridComponent title="Global Data" data={globalDataMap} /> */}

      {/* TABLE */}
      {/* Names */}
      {/* <TableComponent title="Names" data={namesMap} /> */}
      {/* Codes */}
      {/* <TableComponent title="Codes" data={codesMap} /> */}
      {/* Global data */}
      {/* <TableComponent title="Global data" data={globalDataMap} /> */}
      {/* Geography */}
      {/* <TableComponent title="Geography" data={geographyMap} /> */}
      {/* Languages */}
      {/* <TableComponent title="Languages" data={langaguesMap} /> */}

      {/* GRID */}
      <Grid container spacing={0} justifyContent="space-evenly">
        <Grid item xs={12} md={5} sx={{ mx: { xs: "15%", md: "0px" } }}>
          <TableComponent title="Names" data={namesMap} />
        </Grid>
        <Grid item xs={12} md={5} sx={{ mx: { xs: "15%", md: "0px" } }}>
          <TableComponent title="Codes" data={codesMap} />
        </Grid>
        <Grid item xs={12} md={5} sx={{ mx: { xs: "15%", md: "0px" } }}>
          <TableComponent title="Geography" data={geographyMap} />
        </Grid>
        <Grid item xs={12} md={5} sx={{ mx: { xs: "15%", md: "0px" } }}>
          <TableComponent title="Global data" data={globalDataMap} />
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsPage;
