import React from "react";
import SquareButton from "./SquareButton";
import ExcelIcon from "../Icons/ExcelIcon";

const ExcelButton = ({ onClick }) => (
  <SquareButton Icon={ExcelIcon} onClick={onClick} iconColor="#ffffff" />
);

export default ExcelButton;
