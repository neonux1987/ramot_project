import React from "react";
import Cell from "./Cell";

const GroupCell = ({ color = "#000000", span = 1, children }) => {
  return (
    <Cell
      className="groupCell"
      style={{
        gridColumn: `span ${span}`,
        color
      }}
    >
      {children}
    </Cell>
  );
};

export default GroupCell;
