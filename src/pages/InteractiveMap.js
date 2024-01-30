import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "./InteractiveMap.css";
import "leaflet/dist/leaflet.css";
import geojson from "../geojson/countries.json";
import { useSelector } from "react-redux";
import {
  selectAllCountries,
  selectCountryByName,
} from "../redux/slices/countriesSlice";
import { Switch, Typography, Box } from "@mui/material";
import RedirectPopup from "../components/RedirectPopup";
import TreeViewComponent from "../components/TreeViewComponent";
import { buildMap, serializeMap } from "../utilities/map";

const exceptions_FRA = [
  "Guadeloupe",
  "Réunion",
  "Martinique",
  "Mayotte",
  "French Guiana",
];
const exceptions_UNK = ["Kosovo"];
const exceptions_NLD = ["Caribbean Netherlands"];
const exceptions_NOR = ["Svalbard and Jan Mayen", "Bouvet Island"];
const exceptions_NZL = ["Tokelau"];
const exceptions_IndianOceanTerritories = [
  "Cocos (Keeling) Islands",
  "Christmas Island",
];

const countryInitialValue = { name: "", code: "" };

const InteractiveMap = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [dataGeojson, setDataGeojson] = useState(null);
  const [geojsonKey, setGeojsonkey] = useState(0);
  // const [popupPos, setPopupPos] = useState([0, 0]);
  const [visibility, setVisibility] = useState(false);
  const [country, setCountry] = useState(countryInitialValue);
  const map = useRef(null);
  const [treeItem, setTreeItem] = useState(null);

  const countries = useSelector(selectAllCountries);
  console.log(countries);

  const countriesMap = buildMap(countries);
  console.log("countriesMap:", countriesMap);

  const serializedMap = serializeMap(countriesMap);
  console.log("serializedMap: ", serializedMap);
  // console.log("serializedMap stringify:", JSON.stringify(serializedMap));

  // console.log(Object.entries(serializedMap));

  // TESTING - START
  // console.log("geojson:", geojson);
  // console.log("dataGeojson:", dataGeojson);

  // let countries = useSelector(selectAllCountries);
  // console.log("countries:", countries);
  // console.log("size:", countries.length);

  // // Check if all countries are in the geojson
  // let countries_code = [];
  // let geojson_code = [];

  // countries.forEach((element) => {
  //   countries_code.push(element.cca3);
  // });

  // // countries.json
  // geojson.features.forEach((element) => {
  //   geojson_code.push(element.properties.ISO_A3);
  // });

  // // geojson.features.forEach((element) => {
  // //   geojson_code.push(element.properties.adm0_a3);
  // // });

  // countries_code.sort();
  // geojson_code.sort();
  // console.log("countries_code:", countries_code);
  // console.log("geojson_code:", geojson_code);

  // // RESTCountries code that are not in GeoJSON
  // // let tabResults = countries_code.filter(
  // //   (code) => !geojson_code.includes(code)
  // // );

  // // GeoJSON code that are not in RESTCountries
  // let tabResults = geojson_code.filter(
  //   (code) => !countries_code.includes(code)
  // );

  // let tabResults2 = geojson.features.filter(
  //   (element) => element.properties.ISO_A3 === "-99"
  // );

  // if (tabResults.length === 0) {
  //   console.log("Tous les éléments de countries_code sont dans geojson_code.");
  // } else {
  //   console.log(
  //     "Les éléments suivants de countries_code ne sont pas dans geojson_code:",
  //     tabResults
  //   );
  // }
  // console.log(tabResults2);
  // TESTING - END

  // const map = useMap();
  // console.log("map:", map);

  const handleClick = (event) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.feature);
    // console.log(event.target.feature.properties);
    const name = event.target.feature.properties.ADMIN;
    let code = event.target.feature.properties.ISO_A3;

    // Special case for Kosovo
    if (name === "Kosovo") {
      // Didn't manage yet how to use data retrieved from redux with useSelector. So the code cca3 is hardcoded.
      code = "UNK";
    }
    setCountry({ name, code });
  };

  const handleFeature = (feature, layer) => {
    // console.log("handleFeature");
    // console.log(layer);
    // console.log(feature);

    layer.on({ click: handleClick });

    // Attached a popup
    layer.bindPopup(feature.properties.ADMIN);

    // const test = renderToString(<RedirectPopup name={feature.properties.ADMIN} />);
    // console.log(test);
    // console.log(<RedirectPopup name={feature.properties.ADMIN} />);
    // layer.bindPopup(<RedirectPopup name={feature.properties.ADMIN} />);
  };

  // Change dynamically geojson data
  // TESTING - START
  const handleChange = (event) => {
    // console.log(event);
    // console.log("isChecked :", isChecked);

    let data;
    if (isChecked) {
      data = {
        ...geojson,
        features: geojson.features.slice(0, 3),
      };
    } else {
      data = {
        ...geojson,
        features: geojson.features.slice(5, 8),
        // features: geojson.features.filter(
        //   (element) =>
        //     element.properties.ADMIN === "US Naval Base Guantanamo Bay"
        // ),
      };
    }

    // console.log("data:", data);

    setGeojsonkey((value) => value + 1);
    setDataGeojson(data);
    setIsChecked(!isChecked);
  };

  // Change dynamically zoom
  const handleZoom = (event) => {
    console.log("handleZoom");
    // console.log(map);
    // console.log(map.current);
    // map.current.setView([51.505, -0.09], 13);
    map.current.setView([-17.6797, -149.4068], 8, { animate: true });
  };
  // TESTING - END

  const handleItemClick = (id) => {
    // console.log(id);
    const match = id.match(/_([^_]+)$/);
    // console.log(match);
    if (match) {
      const country = match[1];
      console.log("country:", country);
      setTreeItem(country);
    }
  };

  const countryFromRedux = useSelector((state) =>
    selectCountryByName(state, treeItem)
  );

  // console.log(countryFromRedux);

  useEffect(() => {
    console.log("useEffect");
    if (countryFromRedux) {
      console.log(countryFromRedux);
      console.log(countryFromRedux.latlng);
      const desiredLatLng = countryFromRedux.latlng;

      // Update zoom
      map.current.setView(desiredLatLng, 6, { animate: true });

      // Update GeoJSON data
      let data;
      if (exceptions_FRA.includes(countryFromRedux.name.common)) {
        console.log("here");
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ISO_A3 === "FRA"
          ),
        };
      } else if (exceptions_UNK.includes(countryFromRedux.name.common)) {
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ADMIN === "Kosovo"
          ),
        };
      } else if (exceptions_NLD.includes(countryFromRedux.name.common)) {
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ISO_A3 === "NLD"
          ),
        };
      } else if (exceptions_NOR.includes(countryFromRedux.name.common)) {
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ISO_A3 === "NOR"
          ),
        };
      } else if (exceptions_NZL.includes(countryFromRedux.name.common)) {
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ISO_A3 === "NZL"
          ),
        };
      } else if (
        exceptions_IndianOceanTerritories.includes(countryFromRedux.name.common)
      ) {
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ADMIN === "Indian Ocean Territories"
          ),
        };
      } else {
        data = {
          ...geojson,
          features: geojson.features.filter(
            (element) => element.properties.ISO_A3 === countryFromRedux.cca3
          ),
        };
      }
      // console.log("data:", data);

      setGeojsonkey((value) => value + 1);
      setDataGeojson(data);
    }
  }, [countryFromRedux]);

  return (
    <>
      <Typography>Change dynamically geojson data</Typography>
      <Switch checked={isChecked} onChange={handleChange}></Switch>
      <Typography>Change dynamically zoom</Typography>
      <Switch onChange={handleZoom}></Switch>
      <Box sx={{ display: "flex" }}>
        <TreeViewComponent data={serializedMap} onClicked={handleItemClick} />
        <MapContainer
          center={[51.505, -0.09]}
          zoom={4}
          ref={map}
          whenReady={(map) => {
            console.log(map.target);
            map.target.on("zoom", (e) => {
              // console.log("its change");
              console.log("zoom:", map.target.getZoom());
            });
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          />
          <GeoJSON
            // https://github.com/PaulLeCam/react-leaflet/issues/332
            key={geojsonKey}
            attribution="&copy; credits due..."
            data={dataGeojson}
            onEachFeature={handleFeature}
            eventHandlers={{
              // click: (event) => {
              //   console.log("clicked");
              //   // console.log(event);
              //   // console.log(event.latlng);
              //   // setPopupPos([event.latlng.lat, event.latlng.lng]);
              // },
              popupopen: (event) => {
                // console.log("popupopen");
                console.log(event);
                if (
                  event.sourceTarget.feature.properties.ISO_A3 !== "-99" ||
                  event.sourceTarget.feature.properties.ADMIN === "Kosovo"
                ) {
                  setVisibility(true);
                } else {
                  console.log("Can't do it: no country associated");
                }
              },
              popupclose: (event) => {
                // console.log("popupclose");
                setVisibility(false);
                setCountry(countryInitialValue);
              },
            }}
          />
        </MapContainer>
        <RedirectPopup visible={visibility} country={country} />
      </Box>
    </>
  );
};

export default InteractiveMap;
