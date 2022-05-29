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
    width: 12,
    backgroundColor: ({ color }) => color,
    borderRadius: 4
  },
  rail: {
    height: 12,
    background: "none",
    display: "none"
  },
  vertical: {
    '& $rail': {
      width: 12
    },
    '& $track': {
      width: 12
    },
    '& $thumb': {
      marginLeft: -8,
      marginBottom: -11
    }
  }
});

const SliderChart = ({ value, color }) => {
  const classes = useStyles({ value, color });
  return (
    <Slider value={value} disabled classes={classes} orientation="vertical" />
  );
}

export default SliderChart;