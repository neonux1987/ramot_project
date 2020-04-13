import React from 'react';
import { Box } from '@material-ui/core';

export default ({
  marginTop = "20px",
  marginBottom = "20px",
  children,
  className
}) => {
  return (
    <Box mt={marginTop} mb={marginBottom} mx={"20px"} className={className}>
      {children}
    </Box>
  );

}