import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default ({
  title = "",
  titleSize = "18px",
  titleColor = "000000",
  fontWeight = "400",
  marginTop = "20px",
  marginBottom = "20px",
  children
}) => {

  return (
    <Box mt={marginTop} mb={marginBottom} mx={"24px"}>
      <Box mb={"7px"} mt={0}>
        <Typography style={{ fontSize: titleSize, fontWeight: fontWeight, color: titleColor }}>
          {title}
        </Typography>
      </Box>
      <Box>
        {children}
      </Box>

    </Box>
  );

}