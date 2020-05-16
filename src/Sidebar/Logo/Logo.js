import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.toolbarRoot} >
      <Typography className={styles.mainTitle} variant="h4" gutterBottom>
        רמות מז"ח
        </Typography>

      <Typography className={styles.subtitle} variant="h4" gutterBottom>
        ניהול הוצאות הכנסות
        </Typography>
    </div>
  );
};

export default Logo;