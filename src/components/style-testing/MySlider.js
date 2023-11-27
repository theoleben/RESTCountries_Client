import React from "react";
import { Slider } from "@mui/material";
import "./MySlider.css";

const MySlider = () => {
  return (
    <div>
      <Slider
      // According to the YT video - without &
      // sx={{
      //   ".MuiSlider-thumb": { bgcolor: "red" },
      //   ".MuiSlider-track": { bgcolor: "green" },
      //   ".MuiSlider-rail": { bgcolor: "orange" },
      // }}
      // According to the documentation - with &
      // sx={{
      //   "& .MuiSlider-thumb": { bgcolor: "red" },
      //   "& .MuiSlider-track": { bgcolor: "green" },
      //   "& .MuiSlider-rail": { bgcolor: "orange" },
      // }}
      // sx={{
      //   ".MuiSlider-thumb.Mui-active": {
      //     bgcolor: "red",
      //   },
      //   ".MuiSlider-thumb.Mui-focusVisible": {
      //     border: "2px solid orange",
      //   },
      // }}
      />
    </div>
  );
};

export default MySlider;
