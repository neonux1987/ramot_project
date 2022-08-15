import React from "react";
import SquareButton from "./SquareButton";
import PrintIcon from "../Icons/PrintIcon";

const PrintButton = ({ onClick }) => (
  <SquareButton
    Icon={PrintIcon}
    onClick={onClick}
    iconColor="#ffffff"
    withHover
  />
);

export default PrintButton;
