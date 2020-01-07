import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './SectionHeader.module.css';

export default ({
  title = "",
  TitleIcon = null,
  extraDetails = null,
  iconBoxBg = "rgb(44, 183, 197)"
}) => {

  return (
    <div className={styles.wrapper}>

      <div className={styles.titleWrapper}>
        <div className={styles.iconBox} style={{ backgroundColor: iconBoxBg }}>
          <TitleIcon />
        </div>
        <Typography className={styles.title}>
          {title}
        </Typography>
      </div>

      <div className={styles.extraDetailsWrapper}>
        {extraDetails && extraDetails()}
      </div>

    </div>
  );

}