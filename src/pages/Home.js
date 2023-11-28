import React from "react";
import CardComponent from "../components/CardComponent";
import { List, ListItem } from "@mui/material";

const Home = () => {
  const DUMMY_COUNTRIES = [
    {
      common: "countries 1",
      region: "region 1",
      subregion: "subregion 1",
      capitale: "capitale 1",
      unMember: true,
    },
    {
      common: "countries 1",
      region: "region 1",
      subregion: "subregion 1",
      capitale: "capitale 1",
      unMember: false,
    },
    {
      common: "countries 1",
      region: "region 1",
      subregion: "subregion 1",
      capitale: "capitale 1",
      unMember: true,
    },
    {
      common: "countries 1",
      region: "region 1",
      subregion: "subregion 1",
      capitale: "capitale 1",
      unMember: true,
    },
    {
      common: "countries 1",
      region: "region 1",
      subregion: "subregion 1",
      capitale: "capitale 1",
      unMember: true,
    },
  ];

  return (
    <>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {DUMMY_COUNTRIES.map((element) => {
          return (
            <ListItem sx={{ width: 300 }}>
              <CardComponent data={element} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Home;
