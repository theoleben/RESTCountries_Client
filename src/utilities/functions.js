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

export function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500, event);
  };
}

export function calculatePosition(list, item) {
  const listOffsetWidth = list.offsetWidth;
  const itemOffsetWidth = item.offsetWidth;
  const listStyle = getComputedStyle(list);

  // With gap
  const nbElement = Math.round(listOffsetWidth) / itemOffsetWidth;
  const nbElementFloored = Math.floor(nbElement);
  let gap = 0;
  // console.log(listStyle.gap);
  if (listStyle.gap !== "normal") {
    gap = (nbElementFloored - 1) * parseFloat(listStyle.gap);
  }

  // Space
  const space = Math.round(listOffsetWidth - gap) % itemOffsetWidth;
  // console.log("space:", space);

  // Without gap
  const nbElement2 = Math.round(listOffsetWidth - gap) / itemOffsetWidth;
  const nbElement2Floored = Math.floor(nbElement2);

  // Space around
  const factor =
    nbElement2Floored === 1
      ? 0.5
      : nbElement2Floored === 2
      ? 0.25
      : nbElement2Floored === 3
      ? 0.16
      : nbElement2Floored === 4
      ? 0.125
      : 0.1;

  const spaceRight = factor * space;

  // With margins
  const finalSpaceRight = spaceRight + parseFloat(listStyle.marginRight);

  return finalSpaceRight;
}
