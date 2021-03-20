import React from 'react';
import { Typography } from '@material-ui/core';
import { css } from 'emotion';

const TitleTypography = ({
  fontWeight = "600",
  underline = true,
  gutterBottom = "20px",
  variant = "subtitle1",
  children
}) => {

  const style = css`
  font-weight: ${fontWeight};
  text-decoration: ${underline ? "underline" : "none"};
  margin-bottom: ${gutterBottom};
`;
  return <Typography
    variant={variant}
    className={style}
  >
    {children}
  </Typography>
}

export default TitleTypography;