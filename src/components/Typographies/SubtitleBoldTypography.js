import React from 'react';
import { Typography } from '@material-ui/core';

export default ({ children, className, style }) => {
  return <Typography variant="subtitle1" className={className} style={{ fontWeight: "bold", ...style }}>
    {children}
  </Typography>
}