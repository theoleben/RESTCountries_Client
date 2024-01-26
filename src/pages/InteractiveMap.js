import React, { /*useCallback, useEffect,*/ useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  // Popup,
  // FeatureGroup,
  // LayerGroup,
} from "react-leaflet";
import "./InteractiveMap.css";
import "leaflet/dist/leaflet.css";
import geojson from "../geojson/countries.json";
// import { useSelector } from "react-redux";
// import {
//   selectAllCountries,
//   selectCountryByName,
// } from "../redux/slices/countriesSlice";
import { Switch, Typography } from "@mui/material";
// import { renderToString } from "react-dom/server";
import RedirectPopup from "../components/RedirectPopup";

const countryInitialValue = { name: "", code: "" };
const InteractiveMap = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [dataGeojson, setDataGeojson] = useState(geojson);
  const [geojsonKey, setGeojsonkey] = useState(0);
  // const [popupPos, setPopupPos] = useState([0, 0]);
  const [visibility, setVisibility] = useState(false);
  const [country, setCountry] = useState(countryInitialValue);

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
        // features: geojson.features.slice(5, 8),
        features: geojson.features.filter(
          (element) =>
            element.properties.ADMIN === "US Naval Base Guantanamo Bay"
        ),
      };
    }

    // console.log("data:", data);

    setGeojsonkey((value) => value + 1);
    setDataGeojson(data);
    setIsChecked(!isChecked);
  };

  // const updateData = () => {
  //   let data = {
  //     ...geojson,
  //     features: geojson.features.splice(0, 3),
  //   };

  //   console.log(data);

  //   setDataGeojson(data);
  // };
  // TESTING - END
  return (
    <>
      <Typography>Change dynamically geojson data</Typography>
      <Switch checked={isChecked} onChange={handleChange}></Switch>
      {/* <button onClick={updateData}>Mettre à jour</button> */}

      {dataGeojson && (
        <MapContainer center={[51.505, -0.09]} zoom={2}>
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
      )}
      <RedirectPopup visible={visibility} country={country} />
    </>
  );
};

export default InteractiveMap;
