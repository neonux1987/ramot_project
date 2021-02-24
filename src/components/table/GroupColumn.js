import React from 'react';
import { Grid } from '@material-ui/core';
import Column from './Column';

export default ({ color = "#3f414d", span = 1, show = true, children, style, xs = "auto" }) => {
  return <Column
    show={show}
    style={{
      height: "34px",
      color,
      gridColumn: `span ${span}`,
      fontWeight: "500",
      fontSize: "16px",
      ...style
    }}
  >
    {children}
  </Column>
}