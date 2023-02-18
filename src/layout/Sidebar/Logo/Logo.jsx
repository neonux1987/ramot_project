import Typography from "@material-ui/core/Typography";
import React from "react";

// CSS
import { container, mainTitle, subtitle } from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={container}>
      <Typography className={mainTitle} variant="subtitle1">
        NDTS
      </Typography>
      <Typography className={subtitle} variant="subtitle1">
        ניהול תקציבי בניינים
      </Typography>
    </div>
  );
};

export default Logo;
