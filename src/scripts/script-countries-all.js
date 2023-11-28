console.log("script-countries-all");
import { appendFile } from "fs";
import data from "../data/countries_all_v1.js";
// import COUNTRIES_ALL from "../data/countries_all_v2.js";
import { buildMap, serializeMap } from "../utilities/map.js";

// console.log("data.length: ", data.length);
// console.log("COUNTRIES_ALL.length: ", COUNTRIES_ALL.length);

// Build the map
// Here the format of the map:
// {
//   "region1_name": [
//     "subregion1_name": [
//       "name": "countries1_name",
//       "name": "countries2_name",
//       ...
//     ],
//     ... || "name" : "countries1_name" ]
// }

const countriesMap = buildMap(data);
// console.log("countriesMap:", countriesMap);

// Serialize the map
const serializedMap = serializeMap(countriesMap);
// console.log("serializedMap:", serializedMap);

// Generate countries-all json file
const formattedData = JSON.stringify(serializedMap);
const options = { flag: "w" };

appendFile(
  "generated-countries-all.json",
  formattedData,
  options,
  function (err) {
    if (err) throw err;
    console.log("generated-countries-all.json updated!");
  }
);
