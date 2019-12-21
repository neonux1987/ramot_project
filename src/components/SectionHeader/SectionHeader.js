import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './SectionHeader.module.css';

export default ({
  title = "",
  TitleIcon = null,
  extraDetails = null
}) => {

  return (
    <div className={styles.wrapper}>

      <div className={styles.titleWrapper}>
        <TitleIcon />
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