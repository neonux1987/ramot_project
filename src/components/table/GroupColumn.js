import React from 'react';
import Column from './Column';

export default ({ color = "#3f414d", span = 1, show = true, children, style }) => {
  return (
    <Column
      show={show}
      style={{
        height: "34px",
        color,
        gridColumn: `span ${span}`,
        fontWeight: "600",
        fontSize: "16px",
        ...style
      }}
    >
      {children}
    </Column>);
}