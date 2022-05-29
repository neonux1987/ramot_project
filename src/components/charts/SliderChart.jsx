import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    color: "#fafafa",
    height: 12
  },
  thumb: {
    display: "none"
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 12,
    backgroundColor: ({ color }) => color,
    borderRadius: 4
  },
  rail: {
    height: 12,
    display: "none"
  }
});

const SliderChart = ({ value, color }) => {
  const classes = useStyles({ value, color });
  return (
    <Slider value={value} disabled classes={classes} />
  );
}

export default SliderChart;