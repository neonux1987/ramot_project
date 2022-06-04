import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    color: "#fafafa",
    height: 16,
    padding: 0,
  },
  thumb: {
    display: "none",
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 16,
    backgroundColor: ({ color }) => color,
    minWidth: ({ value }) => (value === 0 ? "0%" : "initial"),
    "&:before": {
      content: ({ value }) => `"${Math.round(value)}%"`,
      color: "#ffffff",
      textShadow: "0px 0px 4px #000000",
      display: "flex",
      justifyContent: "center",
      height: 16,
      alignItems: "center",
    },
  },
  rail: {
    height: 16,
    display: "none",
  },
});

const SliderChart = ({ value, color }) => {
  const classes = useStyles({ value, color });
  return <Slider value={value} disabled classes={classes} />;
};

export default SliderChart;
