import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './StatBox.module.css';
import utilStyles from '../../../../assets/css/util.module.css';

export default ({ title, income, outcome, unicodeSymbol }) => {

  return (
    <Box className={styles.infoBox}>

      {/* header */}
      <div className={styles.header} elevation={1}>
        {/* header title */}
        <Typography variant="h6" className={styles.title} gutterBottom>
          {title}
        </Typography>
        {/* header faded line */}
        <span data-line={200} className={utilStyles.fadingLine}></span>
      </div>

      {/* body */}
      <div className={styles.body}>
        {/* income */}
        <div className={styles.content}>
          <div className={styles.alignCenter}>
            <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
              <span className={styles.fontSize20} style={{ color: "rgb(53, 154, 109)" }}>{income} {unicodeSymbol}</span>
            </Typography>
            <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
              הכנסות
            </Typography>
          </div>
        </div>

        {/* outcome */}
        <div className={styles.content}>
          <div className={styles.alignCenter}>
            <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
              <span className={styles.fontSize20} style={{ color: "rgb(255, 55, 92)" }}>{outcome} {unicodeSymbol}</span>
            </Typography>
            <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
              הוצאות
              </Typography>
          </div>
        </div>

      </div>

    </Box>

  );

}