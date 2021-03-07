import React from 'react';
import Column from './Column';

const GroupColumn = ({ color = "#555555", span = 1, show = true, children }) => {
  return <Column
    show={show}
    style={{
      height: "34px",
      color,
      gridColumn: `span ${span}`,
      fontWeight: "500",
      fontSize: "16px",
      borderRight: "none",
      borderBottom: "1px solid"
    }}
  >
    {children}
  </Column>
}

export default GroupColumn;