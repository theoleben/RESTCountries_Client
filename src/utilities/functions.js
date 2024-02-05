import {
  exceptions_FRA,
  exceptions_UNK,
  exceptions_NLD,
  exceptions_NOR,
  exceptions_NZL,
  exceptions_IndianOceanTerritories,
} from "../constants";

export const processGeoDataRegionOrSubregion = (geoJson, dataToProcess) => {
  //   console.log("dataToProcess:", dataToProcess);

  const codes = dataToProcess.map((element) => element.cca3);
  //   console.log(codes);
  const geoData = {
    ...geoJson,
    features: geoJson.features.filter((element) =>
      codes.includes(element.properties.ISO_A3)
    ),
  };
  //   console.log("geoData :", geoData);

  //   let dataS = geoData.features.map((element) => element.properties.ISO_A3);
  //   console.log(dataS);

  //   const codeS = codes.filter((elt) => !dataS.includes(elt));
  //   console.log("codeS:", codeS);

  return geoData;
};

export const processGeoDataCountry = (geojson, country) => {
  let geoData;
  //   console.log(country);
  if (exceptions_FRA.includes(country.name.common)) {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ISO_A3 === "FRA"
      ),
    };
  } else if (exceptions_UNK.includes(country.name.common)) {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ADMIN === "Kosovo"
      ),
    };
  } else if (exceptions_NLD.includes(country.name.common)) {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ISO_A3 === "NLD"
      ),
    };
  } else if (exceptions_NOR.includes(country.name.common)) {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ISO_A3 === "NOR"
      ),
    };
  } else if (exceptions_NZL.includes(country.name.common)) {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ISO_A3 === "NZL"
      ),
    };
  } else if (exceptions_IndianOceanTerritories.includes(country.name.common)) {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ADMIN === "Indian Ocean Territories"
      ),
    };
  } else {
    geoData = {
      ...geojson,
      features: geojson.features.filter(
        (element) => element.properties.ISO_A3 === country.cca3
      ),
    };
  }

  //   console.log("geoData:", geoData);

  return geoData;
};
