// LIBRARIES
import React from 'react';
import { Typography } from '@material-ui/core';
import logoImg from '../../assets/images/eng_ramot_logo3.png';

// CSS
import {
  logoImgContainer,
  mainTitle,
  subtitle,
  container,
  logo,
  subContainer,
  wrapper
} from './Logo.module.css';

const Logo = props => {
  return (
    <div className={container}>

      {/* wrapper */}
      <div className={wrapper}>

        <div className={logoImgContainer}>
          <div className={logo} />
        </div>

        <div className={subContainer}>
          <Typography className={subtitle} variant="subtitle1">
            INCOME OUTCOME MANAGEMENT
          </Typography>
        </div>

      </div>
      {/* end wrapper */}

      {props.children}

    </div>
  );
};

export default Logo;