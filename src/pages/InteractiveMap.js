import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "./InteractiveMap.css";
import "leaflet/dist/leaflet.css";
import geojson from "../geojson/countries.json";
import { useSelector } from "react-redux";
import {
  selectAllCountries,
  selectCountryByType,
} from "../redux/slices/countriesSlice";
import { Switch, Typography, Box } from "@mui/material";
import RedirectPopup from "../components/RedirectPopup";
import TreeViewComponent from "../components/TreeViewComponent";
import { buildMap, serializeMap } from "../utilities/map";
import {
  processGeoDataCountry,
  processGeoDataRegionOrSubregion,
} from "../utilities/functions";
import {
  COUNTRY,
  REGION,
  SUBREGION,
  ViewRegionSubregion,
  exceptions_ANTARTIC,
} from "../constants";
import DisplayPosition from "./ReactLeaflet/ExternalState/DisplayPosition";

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
  // console.log(countries);

  const countriesMap = buildMap(countries);
  // console.log("countriesMap:", countriesMap);

  const serializedMap = serializeMap(countriesMap);
  // console.log("serializedMap: ", serializedMap);
  // console.log("serializedMap stringify:", JSON.stringify(serializedMap));

  // console.log(Object.entries(serializedMap));

  // const tab = countries.filter(
  //   (element) => !element.continents.includes(element.region)
  // );

  // console.log(tab.length);
  // console.log(tab);

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
    setTreeItem(id);
  };

  // Region, subregion and country
  let [type, name, retrievedData] = useSelector((state) =>
    selectCountryByType(state, treeItem)
  );

  // console.log("type :", type);
  // console.log("name: ", name);
  // console.log("retrievedData :", retrievedData);

  useEffect(() => {
    // console.log("useEffect");

    if (
      retrievedData &&
      !Array.isArray(retrievedData) &&
      (type === COUNTRY ||
        (type === SUBREGION &&
          exceptions_ANTARTIC.includes(retrievedData.name.common)))
    ) {
      // console.log(retrievedData);
      // console.log(retrievedData.latlng);
      const desiredLatLng = retrievedData.latlng;

      // Update zoom
      map.current.setView(desiredLatLng, 6, { animate: true });

      // Update GeoJSON data
      const geoData = processGeoDataCountry(geojson, retrievedData);

      setGeojsonkey((value) => value + 1);
      setDataGeojson(geoData);
    } else if (
      (type === REGION || type === SUBREGION) &&
      Array.isArray(retrievedData) &&
      retrievedData.length > 0
    ) {
      // Update zoom
      const obj = ViewRegionSubregion.filter((element) =>
        element.names.includes(name)
      );
      // console.log(obj);
      if (obj.length > 0) {
        map.current.setView(obj[0].latlng, obj[0].zoom, { animate: true });
      }

      // Update GeoJSON data
      const geoData = processGeoDataRegionOrSubregion(geojson, retrievedData);

      setGeojsonkey((value) => value + 1);
      setDataGeojson(geoData);
    }
  }, [type, name, retrievedData]);

  return (
    <>
      <Typography>Change dynamically geojson data</Typography>
      <Switch checked={isChecked} onChange={handleChange}></Switch>
      <Typography>Change dynamically zoom</Typography>
      <Switch onChange={handleZoom}></Switch>
      {/* {map.current ? <DisplayPosition map={map.current} /> : null} */}
      <Box sx={{ display: "flex" }}>
        <TreeViewComponent data={serializedMap} onClicked={handleItemClick} />
        <MapContainer
          center={[51.505, -0.09]}
          zoom={4}
          ref={map}
          whenReady={(map) => {
            // console.log(map.target);
            map.target.on("zoom", (e) => {
              // console.log("its change");
              // console.log("zoom:", map.target.getZoom());
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
