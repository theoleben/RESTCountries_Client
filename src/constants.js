export const exceptions_FRA = [
  "Guadeloupe",
  "Réunion",
  "Martinique",
  "Mayotte",
  "French Guiana",
];
export const exceptions_UNK = ["Kosovo"];
export const exceptions_NLD = ["Caribbean Netherlands"];
export const exceptions_NOR = [
  "Svalbard and Jan Mayen",
  "Bouvet Island",
  "Heard Island and McDonald Islands",
];
export const exceptions_NZL = ["Tokelau"];
export const exceptions_IndianOceanTerritories = [
  "Cocos (Keeling) Islands",
  "Christmas Island",
];

export const exceptions_ANTARTIC = [
  "Antarctica",
  "Bouvet Island",
  "French Southern and Antarctic Lands",
  "Heard Island and McDonald Islands",
  "South Georgia",
];

export const COUNTRY = "level_3";
export const SUBREGION = "level_2";
export const REGION = "level_1";

// RESTCOUNTRIES API doesn't provide lat and long for region and subregion.
export const ViewRegionSubregion = [
  {
    names: [
      "Africa",
      "Eastern Africa",
      "Middle Africa",
      "Northern Africa",
      "Southern Africa",
      "Western Africa",
    ],
    latlng: [5.09, 19.07],
    zoom: 3,
  },
  {
    names: ["Americas"],
    latlng: [45.58, -86.3],
    zoom: 2,
  },
  {
    names: ["Caribbean"],
    latlng: [18.1, -72.64],
    zoom: 4,
  },
  {
    names: ["Central America"],
    latlng: [13.92, -84.33],
    zoom: 4,
  },
  {
    names: ["North America"],
    latlng: [66.65, -93.69],
    zoom: 2,
  },
  {
    names: ["South America"],
    latlng: [-21.77, -62.49],
    zoom: 3,
  },
  {
    names: ["Antarctic"],
    latlng: [4.91, -3.86],
    zoom: 1,
  },
  {
    names: ["Asia"],
    latlng: [26.43, 83.84],
    zoom: 2,
  },
  {
    names: ["Central Asia", "Southern Asia"],
    latlng: [30.9, 85.69],
    zoom: 3,
  },
  {
    names: ["Eastern Asia", "South-Eastern Asia"],
    latlng: [30.9, 102.39],
    zoom: 3,
  },
  {
    names: ["Western Asia"],
    latlng: [30.9, 63.54],
    zoom: 3,
  },
  {
    names: ["Europe", "Eastern Europe"],
    latlng: [54.77, 75.41],
    zoom: 2,
  },
  {
    names: [
      "Central Europe",
      "Southeast Europe",
      "Southern Europe",
      "Western Europe",
    ],
    latlng: [50.23, 17.44],
    zoom: 4,
  },
  {
    names: ["Northern Europe"],
    latlng: [67.94, 6.24],
    zoom: 3,
  },
  {
    names: [
      "Oceania",
      "Australia and New Zealand",
      "Melanesia",
      "Micronesia",
      "Polynesia",
    ],
    latlng: [-19.97, 151.61],
    zoom: 3,
  },
];
