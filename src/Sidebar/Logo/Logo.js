import React from 'react';
import { Typography } from '@material-ui/core';
import {
  mainTitle,
  subtitle,
  logo,
  container,
  LogotextWrapper
} from './Logo.module.css';

const Logo = () => {
  return (
    <div className={container} >

      <div className={logo} />

      <div className={LogotextWrapper}>
        <Typography className={mainTitle} variant="h4" gutterBottom>
          קבוצת רמות
        </Typography>

        <Typography className={subtitle} variant="h4" gutterBottom>
          ניהול הוצאות והכנסות
        </Typography>
      </div>
    </div>
  );
};

export default Logo;