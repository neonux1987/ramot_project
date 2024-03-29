import React from 'react';
import { Box } from '@material-ui/core';
import { css } from 'emotion';

const container = css`
  position: relative;
  margin: 0 0 20px;
`;

const fullscreenStyle = css`
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  -webkit-app-region: no-drag;
  border-radius: 0;
`;

const Section = ({
  marginTop = "20px",
  marginBottom = "20px",
  children,
  className = "",
  isFullscreen = false,
  id = "section",
  style = {}
}) => {

  return <Box
    mt={marginTop}
    mb={marginBottom}
    mx={"20px 40px"}
    className={`${container} ${isFullscreen ? fullscreenStyle : ""} ${className}`}
    style={style}
    id={id}
  >
    {children}
  </Box>

}

export default Section;