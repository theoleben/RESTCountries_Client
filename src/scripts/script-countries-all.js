console.log("script-countries-all");
import { appendFile } from "fs";
import data from "../dummy/countries.js";
import { buildMap, serializeMap } from "../utilities/map.js";

// console.log("data.length: ", data.length);

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

// Generate countries-all-sorted json file
const formattedData = JSON.stringify(serializedMap);
const options = { flag: "w" };

appendFile(
  "generated-countries-all-sorted.json",
  formattedData,
  options,
  function (err) {
    if (err) throw err;
    console.log("generated-countries-all-sorted.json updated!");
  }
);
