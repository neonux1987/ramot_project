import React from 'react';
import { Box } from '@material-ui/core';
import { css } from 'emotion';
import classnames from 'classnames';

const container = css`
  position: relative;
`;

const fullscreenStyle = css`
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 700;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  -webkit-app-region: no-drag;
`;

const Section = ({
  marginTop = "20px",
  marginBottom = "20px",
  children,
  className = "",
  isFullscreen = false,
  id = "section"
}) => {

  return <Box
    mt={marginTop}
    mb={marginBottom}
    mx={"20px"}
    className={classnames(container, isFullscreen ? fullscreenStyle : "", className)}
    id={id}
  >
    {children}
  </Box>

}

export default Section;