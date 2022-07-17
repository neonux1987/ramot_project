import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import logo from "../../assets/images/ramot group.png";
import { css, keyframes } from "emotion";
import { AlignCenterMiddle } from "../AlignCenterMiddle/AlignCenterMiddle";
import Typography from "@material-ui/core/Typography";

const container = css`
  flex-direction: column;
`;

const imageWrapper = css`
  overflow: hidden;
  margin-bottom: 0px;
  width: 200px;
  display: flex;
  justify-content: center;
`;

const spin = keyframes`
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
`;

const textStyle = css`
  margin-bottom: 10px !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  font-family: "Open Sans", sans-serif !important;
`;

const propagateLoaderStyle = {
  height: "20px",
  width: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const AppLoader = (props) => {
  return (
    <AlignCenterMiddle className={container}>
      <div className={imageWrapper}>
        <img
          className={css`
            filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.19));
          `}
          src={logo}
          width="100px"
          height="100px"
          alt="spinning loader"
        />
      </div>

      <Typography className={textStyle} variant="subtitle1">
        {props.text}
      </Typography>

      <PropagateLoader
        cssOverride={propagateLoaderStyle}
        size={15}
        loading={props.loading}
        color={"#000"}
      />
    </AlignCenterMiddle>
  );
};

export default AppLoader;
