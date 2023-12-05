import React from "react";
import { List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getCountriesStatus,
  selectAllCountries,
} from "../redux/slices/countriesSlice";
import CardComponent from "../components/CardComponent";
import { sortingByName } from "../utilities/sorting";

const Home = () => {
  let countries = useSelector(selectAllCountries);
  const status = useSelector(getCountriesStatus);

  // console.log(status);
  // console.log(countries);
  let sortedCountries;
  if (status === "succeeded") {
    sortedCountries = [...countries];
    sortedCountries.sort((a, b) => sortingByName(a, b));
    // console.log(countries);
  }
  return (
    <>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {sortedCountries &&
          sortedCountries.map((element, index) => {
            return (
              <ListItem sx={{ width: 300 }} key={index}>
                <CardComponent data={element} />
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default Home;
