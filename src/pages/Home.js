import React, { useEffect, useMemo, useRef, useState } from "react";
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

import data from "../dummy/countries";

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
  // let sortedCountries = [...data];
  let sortedCountries = useMemo(() => [...data], []);
  // if (status === "succeeded") {
  //   sortedCountries = [...countries];
  //   sortedCountries.sort((a, b) => sortingByName(a.name.common, b.name.common));
  //   // console.log(countries);
  // }

  useEffect(() => {
    // console.log("** useEffect App **");
    // console.log("window.innerWidth:", window.innerWidth);
    // console.log("window.outerWidth:", window.outerWidth);
    // console.log(
    //   "document.documentElement.clientWidth:",
    //   document.documentElement.clientWidth
    // );
    const list = listRef.current;
    const item = itemRef.current;
    console.log(sortedCountries);
    if (list && item && sortedCountries) {
      // const listOffsetWidth = list.offsetWidth;
      // const itemOffsetWidth = item.offsetWidth;
      // // console.log("listOffsetWidth:", listOffsetWidth);
      // // console.log("itemOffsetWidth:", itemOffsetWidth);
      // const listStyle = getComputedStyle(list);
      // // console.log("listStyle.marginLeft:", listStyle.marginLeft);
      // // console.log("listStyle.marginRight:", listStyle.marginRight);
      // // console.log("listStyle.gap:", listStyle.gap);
      // // console.log(parseFloat(listStyle.marginLeft));
      // // const totalWidth =
      // //   listRef.current.offsetWidth +
      // //   parseFloat(listStyle.marginLeft) +
      // //   parseFloat(listStyle.marginRight);
      // // console.log("totalWidth:", totalWidth);
      // // console.log("totalWidth:", Math.round(totalWidth));

      // // With gap
      // const nbElement = Math.round(listOffsetWidth) / itemOffsetWidth;
      // // console.log("nbElement: ", nbElement);
      // const nbElementFloored = Math.floor(nbElement);
      // // console.log("nbElementFloored:", nbElementFloored);
      // const gap = (nbElementFloored - 1) * parseFloat(listStyle.gap);
      // // console.log("gap:", gap);

      // // Space
      // const space = Math.round(listOffsetWidth - gap) % itemOffsetWidth;
      // // console.log("space:", space);

      // // Without gap
      // const nbElement2 = Math.round(listOffsetWidth - gap) / itemOffsetWidth;
      // const nbElement2Floored = Math.floor(nbElement2);
      // // console.log("nbElement2Floored:", nbElement2Floored);

      // // Space around
      // const factor =
      //   nbElement2Floored === 1
      //     ? 0.5
      //     : nbElement2Floored === 2
      //     ? 0.25
      //     : nbElement2Floored === 3
      //     ? 0.16
      //     : nbElement2Floored === 4
      //     ? 0.125
      //     : 0.1;
      // // console.log("factor:", factor);

      // const spaceRight = factor * space;
      // // console.log("spaceRight:", spaceRight);

      // // With margins
      // const finalSpaceRight = spaceRight + parseFloat(listStyle.marginRight);
      // // console.log("finalSpaceRight:", finalSpaceRight);

      const finalSpaceRight = calculatePosition(list, item);

      // Updating scrollToTop position
      setPos(`${finalSpaceRight}px`);
    }

    // console.log("window.outerWidth:", window.outerWidth);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", debounce(handleResize));
    // window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debounce(handleResize));
      // window.removeEventListener("resize", handleResize);
    };
  }, [sortedCountries]);

  const handleScroll = () => {
    // console.log("window.innerWidth:", window.innerWidth);
    // console.log("handleScroll");
    // console.log("window.scrollY:", window.scrollY);
    // console.log("window.innerHeight:", window.innerHeight);
    // console.log("document.body.scrollHeight;:", document.body.scrollHeight);
    const limit = Math.round(document.body.scrollHeight / 6);
    // console.log(limit);
    if (window.scrollY > limit) {
      setScrollVisible(true);
    } else {
      setScrollVisible(false);
    }
  };

  const handleResize = () => {
    console.log("handleResize");

    const list = listRef.current;
    const item = itemRef.current;

    if (list && item) {
      const finalSpaceRight = calculatePosition(list, item);

      // Updating scrollToTop position
      setPos(`${finalSpaceRight}px`);
    }
  };

  const handleScrollToTop = () => {
    // console.log("handleScrollToTop");
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
          right: `calc(${pos}/2 - 26px)`,
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
