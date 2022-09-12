import React from "react";
import SquareButton from "./SquareButton";
import PrintIcon from "../Icons/PrintIcon";

const PrintButton = ({ onClick, disabled }) => (
  <SquareButton
    Icon={PrintIcon}
    onClick={onClick}
    iconColor="#ffffff"
    withHover
    disabled={disabled}
  />
);

export default PrintButton;
