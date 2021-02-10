// LIBRARIES
import React from 'react';
import { Typography } from '@material-ui/core';
import logoPng from '../../assets/images/ramot group.png';

// CSS
import {
  mainTitle,
  subtitle,
  logo,
  container,
  LogotextWrapper,
  appVersionWrapper,
  logoWrapper
} from './Logo.module.css';

//ELECTRON
const appVersion = require("electron").remote.app.getVersion();

const Logo = () => {
  return (
    <div className={container} >

      {/* <div className={logo} /> */}
      <div className={logoWrapper}>
        <img src={logoPng} width="44px" height="44px" />
      </div>

      <div className={LogotextWrapper}>
        <Typography className={mainTitle} variant="h4" gutterBottom>
          קבוצת רמות
        </Typography>

        <Typography className={subtitle} variant="h4" gutterBottom>
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