import React from "react";
import COUNTRIES_ALL from "../dummy/countries";

const Dummy = () => {
  // NATIVE NAMES
  // No native names
  const noNativeName = COUNTRIES_ALL.filter((element) => {
    return !element.name.hasOwnProperty("nativeName");
  });
  console.log("Countries that have no native names:", noNativeName);

  // Multiple natives names
  const multipleNativeName = COUNTRIES_ALL.filter((element) => {
    return element.name.hasOwnProperty("nativeName") &&
      Object.entries(element.name.nativeName).length > 1
      ? true
      : false;
  });
  console.log("Countries that have multiple native names:", multipleNativeName);

  // CURRENCIES
  // No currency
  const noCurrency = COUNTRIES_ALL.filter((element) => {
    return !element.hasOwnProperty("currencies");
  });
  console.log("Countries that have no currency:", noCurrency);

  // Multiple currencies
  const multipleCurrencies = COUNTRIES_ALL.filter((element) => {
    return element.hasOwnProperty("currencies") &&
      Object.entries(element.currencies).length > 1
      ? true
      : false;
  });
  console.log("Countries that have mutliple currencies:", multipleCurrencies);

  // CAPITAL
  // No capital
  const noCapital = COUNTRIES_ALL.filter((element) => {
    return !element.hasOwnProperty("capital");
  });
  console.log("Countries that have no capital:", noCapital);

  // Multiple capital
  const multipleCapital = COUNTRIES_ALL.filter((element) => {
    return element.hasOwnProperty("capital") && element.capital.length > 1;
  });
  console.log("Countries that have multiple capital:", multipleCapital);

  // LANGUAGES
  // No language
  const noLanguage = COUNTRIES_ALL.filter((element) => {
    return !element.hasOwnProperty("languages");
  });
  console.log("Countries that have no languages:", noLanguage);

  // Multiple languages
  const multipleLanguages = COUNTRIES_ALL.filter((element) => {
    return element.hasOwnProperty("languages") &&
      Object.entries(element.languages).length > 1
      ? true
      : false;
  });
  console.log("Countries that have multiple languages:", multipleLanguages);

  return <div>Dummy</div>;
};

export default Dummy;
