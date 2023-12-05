import { DYNAMIC_LABELS, LABELS } from "./labels";

function commaFormatting(array) {
  let formattedString = "";
  array.forEach((element, index) => {
    // console.log(element);
    formattedString += element;
    if (index !== array.length - 1) {
      formattedString += ", ";
    }
  });

  return formattedString;
}

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildMapObject(map, propertyName, object) {
  const label = LABELS[propertyName];
  // console.log(propertyName);
  // console.log(label);
  // console.log(object[propertyName]);
  if (!object.hasOwnProperty(propertyName)) {
    map.set(label, "-");
  } else if (DYNAMIC_LABELS.includes(propertyName)) {
    const formattedStr = commaFormatting(object[propertyName]);
    let title = "";
    switch (propertyName) {
      case "continents":
        title = object.continents.length > 1 ? "Continents" : "Continent";
        break;
      case "capital":
        title = object.capital.length > 1 ? "Capitals" : "Capital";
        break;
      case "timezones":
        title = object.timezones.length > 1 ? "Timezones" : "Timezone";
        break;
      case "latlng":
        title = label;
        break;
      case "borders":
        title = label;
        break;
      default:
        title = "Default title";
    }
    map.set(title, formattedStr);
  } else if (propertyName === "startOfWeek") {
    const str = firstLetterUpperCase(object[propertyName]);
    map.set(label, str);
  } else if (propertyName === "car") {
    if (!object[propertyName].hasOwnProperty("side")) {
      map.set(label, "-");
    } else {
      const str = firstLetterUpperCase(object[propertyName].side);
      map.set(label, str);
    }
  } else {
    map.set(label, object[propertyName]);
  }
}

function buildComplexMapObject(map, propertyName, object) {
  const label = LABELS[propertyName];
  if (!object.hasOwnProperty(propertyName)) {
    map.set(label, "-");
  } else if (propertyName === "currencies") {
    const currenciesMap = new Map();
    let idx = 0;
    for (const [key, value] of Object.entries(object[propertyName])) {
      currenciesMap.set(
        `currency_${idx}`,
        `${key} / ${value.name} / ${value.symbol}`
      );
      idx++;
    }

    const currencyLabel = currenciesMap.size === 1 ? "Currency" : label;
    map.set(currencyLabel, currenciesMap);
  } else if (propertyName === "languages") {
    const langaguesMap = new Map();
    for (const [key, value] of Object.entries(object[propertyName])) {
      langaguesMap.set(`${key}`, value);
    }

    const languagesLabel = langaguesMap.size === 1 ? "Language" : label;
    map.set(languagesLabel, langaguesMap);
  } else {
    map.set(label, object[propertyName]);
  }
}

function buildNestedMapObject(map, propertyName, object) {
  const props = propertyName.split(".");
  // console.log(props);
  // console.log(object);
  if (!object.hasOwnProperty(props[0])) {
    const label = LABELS[props[0]];
    map.set(label, "-");
  } else {
    const nameObj = object[props[0]];
    if (!object[props[0]].hasOwnProperty(props[1])) {
      const label = LABELS[props[1]];
      map.set(label, "-");
    } else if (props[1] === "nativeName") {
      // console.log("here doing it");
      // console.log(object[props[0]]);
      const nativeNames = new Map();
      for (const [key, value] of Object.entries(nameObj[props[1]])) {
        nativeNames.set(`${object.languages[key]} (Common)`, value.common);
        nativeNames.set(`${object.languages[key]} (Official)`, value.official);
      }

      const nativeNameTitle =
        nativeNames.size > 1 ? "Native names" : "Native name";
      map.set(nativeNameTitle, nativeNames);
    } else if (props[1] === "common" || props[1] === "official") {
      const label = LABELS[props[1]];
      map.set(label, nameObj[props[1]]);
    }
  }
}

export function namesMapObject(obj) {
  let map = new Map();

  buildNestedMapObject(map, "name.common", obj);
  buildNestedMapObject(map, "name.official", obj);
  buildNestedMapObject(map, "name.nativeName", obj);

  return map;
}

export function codesMapObject(obj) {
  let map = new Map();

  buildMapObject(map, "cca2", obj);
  buildMapObject(map, "cca3", obj);
  buildMapObject(map, "ccn3", obj);
  buildMapObject(map, "independent", obj);
  buildMapObject(map, "fifa", obj);
  buildMapObject(map, "cioc", obj);

  return map;
}

export function geographyMapObject(obj) {
  let map = new Map();

  buildMapObject(map, "continents", obj);
  buildMapObject(map, "region", obj);
  buildMapObject(map, "subregion", obj);
  buildMapObject(map, "capital", obj);
  buildMapObject(map, "timezones", obj);
  buildMapObject(map, "latlng", obj);
  buildMapObject(map, "area", obj);
  buildMapObject(map, "landlocked", obj);
  buildMapObject(map, "borders", obj);

  return map;
}

export function globalDataMapObject(obj) {
  let map = new Map();

  buildMapObject(map, "population", obj);
  buildComplexMapObject(map, "currencies", obj);
  buildMapObject(map, "startOfWeek", obj);
  buildMapObject(map, "car", obj);
  buildComplexMapObject(map, "languages", obj);

  return map;
}
