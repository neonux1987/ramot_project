import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './SectionTitle.module.css';

export default ({
  title = "",
  TitleIcon,
  titleSize = "18px",
  titleColor = "000000",
  fontWeight = "400",
  bgColor = "initial",
  children
}) => {

  const icon = TitleIcon ? <TitleIcon /> : null;

  return (
    <div className={styles.wrapper}>

      <div className={styles.styled} style={{ backgroundColor: bgColor }}>
        {icon}
        <Typography style={{
          fontSize: titleSize,
          fontWeight: fontWeight,
          color: titleColor,
          marginRight: "5px"
        }}>
          {title || children}
        </Typography>
      </div>

    </div>
  );

}