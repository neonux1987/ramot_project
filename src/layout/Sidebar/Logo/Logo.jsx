import Typography from "@material-ui/core/Typography";
import React from "react";

// CSS
import {
  container,
  extraTitle,
  extraTitleWrapper,
  mainTitle,
  subtitle
} from "./Logo.module.css";

const Logo = () => {
  return (
    <>
      <div className={container}>
        <Typography className={mainTitle} variant="subtitle1">
          NDTS
        </Typography>
        <Typography className={subtitle} variant="subtitle1">
          ניהול תקציבי בניינים
        </Typography>
      </div>
      <div className={extraTitleWrapper}>
        <Typography className={extraTitle} variant="subtitle1">
          עבור קבוצת רמות
        </Typography>
      </div>
    </>
  );
};

export default Logo;
