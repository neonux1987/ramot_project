import React from 'react';
import { Typography } from '@material-ui/core';

export default ({ children, className, style, underline = false, gutterBottom }) => {
  return <Typography
    variant="subtitle1"
    className={className}
    style={{
      fontWeight: "bold",
      textDecoration: underline ? "underline" : "",
      ...style
    }}
    gutterBottom={gutterBottom}
  >
    {children}
  </Typography>
}