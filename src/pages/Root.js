import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";

const Root = () => {
  const mainRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const [position, setPosition] = useState(false);
  // console.log("Root");
  // console.log(position);

  // console.log(mainRef);

  const mainHandler = () => {
    // console.log("HERE2");
    // // Refs
    // console.log(mainRef.current);
    // console.log(navRef.current);
    // console.log(footerRef.current);
    // // Heights
    // console.log("main :", mainRef.current.offsetHeight);
    // console.log("nav :", navRef.current.offsetHeight);
    // console.log("footer :", footerRef.current.offsetHeight);
    // // Window
    // console.log("window :", window.innerHeight);

    // console.log(footerRef.current.style);
    // console.log(window.getComputedStyle(footerRef.current).marginTop);

    // Available space
    let availableSpace =
      window.innerHeight -
      navRef.current.offsetHeight -
      footerRef.current.offsetHeight;

    // console.log("availableSpace:", availableSpace);

    // console.log("RESET");
    setPosition(false);

    if (mainRef.current.offsetHeight < availableSpace) {
      // console.log("POS");
      setPosition(true);
    }
  };

  useEffect(() => {
    // console.log("useEffect root");
    // console.log(mainRef);
    // console.log("main height:", mainRef.current.offsetHeight);
    const ref = mainRef.current;

    const resizeObserver = new ResizeObserver(mainHandler);
    resizeObserver.observe(ref);

    return () => {
      resizeObserver.unobserve(ref);
    };
  }, []);

  return (
    <>
      <MainNavigation ref={navRef} />
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer positioned={position} ref={footerRef} />
    </>
  );
};

export default Root;
