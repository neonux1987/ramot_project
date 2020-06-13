import React from 'react';
import { Typography } from '@material-ui/core';
import { css } from 'emotion';

export default ({
  fontWeight = "600",
  textDecoration = "",
  gutterBottom = "15px",
  variant = "subtitle1",
  children
}) => {

  const style = css`
  font-weight: ${fontWeight};
  text-decoration: ${textDecoration};
  margin-bottom: ${gutterBottom};
`;
  return <Typography
    variant={variant}
    className={style}
  >
    {children}
  </Typography>
}