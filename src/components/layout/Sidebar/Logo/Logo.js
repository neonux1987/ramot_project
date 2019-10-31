import React from 'react';
import { Toolbar, Typography, withStyles } from '@material-ui/core';
import styles from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={styles.toolbarRoot} >
      <Typography className={styles.typography} variant="h4" gutterBottom>
        NDTS
        </Typography>
    </div>
  );
};

export default Logo;