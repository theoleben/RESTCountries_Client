import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojson from "../geojson/countries.json";
import { useSelector } from "react-redux";
import {
  selectAllCountries,
  selectCountryByType,
} from "../redux/slices/countriesSlice";
import { Box } from "@mui/material";
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
import "./InteractiveMap.css";

const countryInitialValue = { name: "", code: "" };

const InteractiveMap = () => {
  const [dataGeojson, setDataGeojson] = useState(null);
  const [geojsonKey, setGeojsonkey] = useState(0);
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

  const handleClick = (event) => {
    // console.log(event);
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
  };

  const handleItemClick = (id) => {
    setTreeItem(id);

    if (visibility || country.name.length > 0 || country.code.length > 0) {
      setVisibility(false);
      setCountry(countryInitialValue);
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          width: "100%",
          my: {
            xs: "50px",
            sm: "0px",
          },
          // border: "1px solid green",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "40%" },
            maxWidth: { xs: "100%", sm: "350px" },
            padding: "10px",
            // border: "1px solid orange",
          }}
        >
          <TreeViewComponent data={serializedMap} onClicked={handleItemClick} />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "60%" },
            padding: "10px",
            // border: "1px solid blue",
          }}
        >
          <MapContainer
            // worldCopyJump={true}
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
              // url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
              // url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
              // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
            />
            <GeoJSON
              // https://github.com/PaulLeCam/react-leaflet/issues/332
              key={geojsonKey}
              attribution="&copy; credits due..."
              data={dataGeojson}
              onEachFeature={handleFeature}
              eventHandlers={{
                popupopen: (event) => {
                  // console.log("popupopen");
                  // console.log(event);
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
      </Box>
    </>
  );
};

export default InteractiveMap;
