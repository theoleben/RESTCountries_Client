import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./MainNavigation.module.css";

const navItems = [
  { name: "Home", path: "" },
  { name: "Interactive map", path: "interactive-map" },
  { name: "Statistics", path: "statistics" },
  { name: "About", path: "about" },
];

const MainNavigation = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  // console.log("boolean menuAnchor:", Boolean(menuAnchor));

  const openMenuHandler = (event) => {
    console.log("openMenuHandler");
    console.log(event);
    console.log(event.currentTarget);
    setMenuAnchor(event.currentTarget);
  };

  const closeMenuHandler = () => {
    console.log("closeMenuHandler");
    setMenuAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.header}>
        <Toolbar component="nav">
          {/* MENU - START */}
          <Box sx={{ display: { sm: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu of the website"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openMenuHandler}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              keepMounted
              open={Boolean(menuAnchor)}
              onClose={closeMenuHandler}
              sx={{
                display: { sm: "block", md: "none" },
              }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.name} onClick={closeMenuHandler}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "activate" : "")}
                  >
                    {item.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* MENU - END */}
          {/* ICON - START */}
          <Box
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: { xs: "flex", md: "block" },
              justifyContent: { xs: "center", md: "normal" },
            }}
          >
            <NavLink to="">
              <FlagOutlinedIcon />
            </NavLink>
          </Box>
          {/* ICON -END */}
          {/* TABLET - START */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ mx: "20px" }}>
                <NavLink
                  to={item.path}
                  // Solution 1 - with only "active" class dynamically set in css - Research have to be done bc we have a different behavior in the course

                  // Solution 2 - with the custom class "activate" when the link is active
                  // className={({ isActive }) => (isActive ? "activate" : "")}
                >
                  {item.name}
                </NavLink>
              </Button>
            ))}
          </Box>
          {/* TABLET END */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigation;
