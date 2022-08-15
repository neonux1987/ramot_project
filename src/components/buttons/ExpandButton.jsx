import React from "react";
import { Button } from "@material-ui/core";
import RotatingExpandLessIcon from "../Icons/RotatingExpandLessIcon";

const ExpandButton = ({ checked, onClick, color = "#000000" }) => {
  return (
    <Button onClick={onClick}>
      <RotatingExpandLessIcon
        width="40px"
        height="40px"
        color={color}
        open={checked}
      />
    </Button>
  );
};

export default ExpandButton;
