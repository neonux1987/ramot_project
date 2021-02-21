// LIBRARIES
import React from 'react';
import { Typography } from '@material-ui/core';
import logoPng from '../../assets/images/ramot group.png';

// CSS
import {
  mainContainer,
  mainTitle,
  subtitle,
  logo,
  container,
  LogotextWrapper,
  appVersionWrapper,
  logoWrapper,
  subContainer
} from './Logo.module.css';

//ELECTRON
const appVersion = require("electron").remote.app.getVersion();

const Logo = () => {
  return (
    <div className={container} >

      {/* <div className={logo} /> */}

      <div className={LogotextWrapper}>
        <div className={logoWrapper}>
          <img src={logoPng} />
        </div>

        <div className={mainContainer}>
          <Typography className={mainTitle} variant="h4">
            קבוצת רמות
        </Typography>
        </div>
      </div>

      <div className={subContainer}>
        <Typography className={subtitle} variant="subtitle1">
          ניהול הוצאות והכנסות
        </Typography>
      </div>

      {/* <div className={appVersionWrapper}>
                <span>{`v${appVersion}`}</span>
            </div> */}
    </div>
  );
};

export default Logo;