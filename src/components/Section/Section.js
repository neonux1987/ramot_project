import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './Section.module.css';

export default ({
  title = "",
  TitleIcon,
  titleSize = "18px",
  titleColor = "000000",
  fontWeight = "400",
  marginTop = "20px",
  marginBottom = "20px",
  children
}) => {

  const icon = TitleIcon ? <TitleIcon /> : null;

  return (
    <Box mt={marginTop} mb={marginBottom} mx={"20px"}>
      {children}
    </Box>
  );

}