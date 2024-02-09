import React, { useEffect, useRef, useState } from "react";
import { IconButton, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getCountriesStatus,
  selectAllCountries,
} from "../redux/slices/countriesSlice";
import CardComponent from "../components/CardComponent";
import { sortingByName } from "../utilities/sorting";
import Hero from "../components/Hero";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { calculatePosition, debounce } from "../utilities/functions";

const Home = () => {
  const listRef = useRef(null);
  const itemRef = useRef(null);
  let countries = useSelector(selectAllCountries);
  const status = useSelector(getCountriesStatus);

  const [scrollVisible, setScrollVisible] = useState(false);
  // console.log("scrollVisible:", scrollVisible);
  const [pos, setPos] = useState("0px");
  // console.log("pos:", pos);

  // console.log(status);
  // console.log(countries);

  let sortedCountries;
  if (status === "succeeded") {
    sortedCountries = [...countries];
    sortedCountries.sort((a, b) => sortingByName(a.name.common, b.name.common));
    // console.log(countries);
  }

  useEffect(() => {
    const list = listRef.current;
    const item = itemRef.current;
    // console.log(sortedCountries);
    if (list && item && sortedCountries) {
      const finalSpaceRight = calculatePosition(list, item);

      // Updating scrollToTop position
      setPos(`${finalSpaceRight}px`);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", debounce(handleResize));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debounce(handleResize));
    };
  }, [sortedCountries]);

  const handleScroll = () => {
    const limit = Math.round(document.body.scrollHeight / 6);
    if (window.scrollY > limit) {
      setScrollVisible(true);
    } else {
      setScrollVisible(false);
    }
  };

  const handleResize = () => {
    const list = listRef.current;
    const item = itemRef.current;

    if (list && item) {
      const finalSpaceRight = calculatePosition(list, item);

      // Updating scrollToTop position
      setPos(`${finalSpaceRight}px`);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Hero />
      <List
        ref={listRef}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mx: "5%",
          my: "50px",
          gap: "50px",
        }}
      >
        {sortedCountries &&
          sortedCountries.map((element, index) => {
            return (
              <ListItem
                // sx={{ width: 300, marginBottom: "20px", p: 0 }}
                sx={{ width: 300, p: 0 }}
                key={index}
                ref={itemRef}
              >
                <CardComponent data={element} />
              </ListItem>
            );
          })}
      </List>
      <IconButton
        color="primary"
        sx={{
          zIndex: 100,
          position: "fixed",
          bottom: "52px",
          right: { xs: `calc(${pos}/2 - 20px)`, sm: `calc(${pos}/2 - 21px)` },
          border: { xs: "none", sm: "1px dashed" },
          borderColor: "primary.main",
          visibility: `${scrollVisible ? "visible" : "hidden"}`,
        }}
        onClick={handleScrollToTop}
      >
        <KeyboardDoubleArrowUpIcon />
      </IconButton>
    </>
  );
};

export default Home;
