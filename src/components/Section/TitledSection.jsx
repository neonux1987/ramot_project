import React from "react";
import Box from "@material-ui/core/Box";
import { Collapse, Typography } from "@material-ui/core";
import ExpandButton from "../buttons/ExpandButton";
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

const TitledSection = ({
  title = "",
  children,
  TitleIcon,
  id = "",
  margin = "20px 0",
  collapsable = true,
  extraDetails = null,
}) => {
  const [checked, setChecked] = React.useState(true);
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box margin={margin} id={id}>
      <Box
        id="titled-section-header"
        display={isFullscreen ? "none" : "flex"}
        alignItems="center"
        borderBottom="1px solid #dddddd"
        marginBottom="20px"
        height="70px"
        paddingLeft="10px"
      >
        <Box
          color="#ffffff"
          marginRight="10px"
          boxShadow="rgb(20 20 20 / 12%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(20 20 20 / 7%) 0rem 0.125rem 0.25rem -0.0625rem"
          borderRadius="4px"
          width="42px"
          height="42px"
          padding="6px"
          bgcolor="rgb(81 89 103)"
        >
          {TitleIcon}
        </Box>
        <Box flexGrow="1">
          <Typography
            style={{ color: "#000000", fontWeight: 600, fontSize: "32px" }}
            variant="h5"
          >
            {title}
          </Typography>
        </Box>
        <div>{extraDetails}</div>
        {collapsable && (
          <Box marginRight="0px">
            <ExpandButton checked={checked} onClick={handleChange} />
          </Box>
        )}
      </Box>

      <Collapse in={checked}>
        <div className={isFullscreen ? fullscreenStyle : ""}>{children}</div>
      </Collapse>
    </Box>
  );
};

export default TitledSection;
