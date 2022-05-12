import React from 'react';
import { Typography } from '@material-ui/core';

const SubtitleBoldTypography = ({ children, className, style, underline = false, gutterBottom }) => {
  return <Typography
    variant="subtitle1"
    className={className}
    style={{
      fontWeight: "500",
      textDecoration: underline ? "underline" : "",
      ...style
    }}
    gutterBottom={gutterBottom}
  >
    {children}
  </Typography>
}

export default SubtitleBoldTypography;