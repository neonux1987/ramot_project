import React from 'react';
import Column from './Column';

export default ({ bgColor = "", span = 1, show = true, children }) => {
  return (
    <Column
      show={show}
      style={{
        height: "27px",
        backgroundColor: bgColor,
        gridColumn: `span ${span}`,
        color: "#fff",
        fontWeight: "600"
      }}
    >
      {children}
    </Column>);
}