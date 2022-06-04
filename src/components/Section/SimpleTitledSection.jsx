import React from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import SquareIcon from "../SquareIcon/SquareIcon";
import { css } from "emotion";
import { useSelector } from "react-redux";

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

const SimpleTitledSection = ({
  title = "",
  children,
  TitleIcon,
  id = "",
  margin = "20px 0",
  extraDetails = null,
}) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  return (
    <Box id={id} margin={margin}>
      <Box
        id="titled-section-header"
        display="flex"
        alignItems="center"
        padding="20px 10px 10px"
      >
        <Box flexGrow="1">
          <Typography
            style={{
              fontSize: "32px",
              fontWeight: "500",
            }}
            variant="h5"
          >
            {title}
          </Typography>
        </Box>
        <Box>{extraDetails}</Box>
      </Box>

      <Box
        bgcolor="#ffffff"
        id="titled-section-content"
        boxShadow="rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem"
        border="1px solid #dddddd"
        borderRadius="14px"
        overflow="hidden"
        position="relative"
        height="100%"
        className={isFullscreen ? fullscreenStyle : ""}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SimpleTitledSection;
