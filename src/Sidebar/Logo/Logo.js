// LIBRARIES
import React from 'react';
import { Typography } from '@material-ui/core';
import logoPng from '../../assets/images/ramot group.png';

// CSS
import {
  mainContainer,
  mainTitle,
  subtitle,
  container,
  logoWrapper,
  subContainer
} from './Logo.module.css';

//ELECTRON
const appVersion = require("electron").remote.app.getVersion();

const Logo = props => {
  return (
    <div className={container} >

      {/* wrapper */}
      <div>

        {/* logo wrapper */}
        <div className={logoWrapper}>

          <div className={mainContainer}>
            <Typography className={mainTitle} variant="h4">
              קבוצת רמות
        </Typography>
          </div>

          <div className={subContainer}>
            <Typography className={subtitle} variant="subtitle1">
              ניהול הוצאות והכנסות
        </Typography>
          </div>

        </div>
        {/* end logo wrapper */}

      </div>
      {/* end wrapper */}

      {props.children}

    </div>
  );
};

export default Logo;