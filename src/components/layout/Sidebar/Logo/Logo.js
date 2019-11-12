import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.toolbarRoot} >
      <Typography className={styles.typography} variant="h4" gutterBottom>
        NDTS
        </Typography>
    </div>
  );
};

export default Logo;