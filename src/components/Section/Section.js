import React from 'react';
import { Box } from '@material-ui/core';

const Section = ({
  marginTop = "20px",
  marginBottom = "20px",
  children,
  className
}) => {
  return <Box mt={marginTop} mb={marginBottom} mx={"20px"} className={className} id="section">
    {children}
  </Box>

}

export default Section;