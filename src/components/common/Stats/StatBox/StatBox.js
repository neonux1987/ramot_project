import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './StatBox.module.css';
import utilStyles from '../../../../assets/css/util.module.css';

export default ({ title, income, outcome, unicodeSymbol, bgColor = "#7553c5" }) => {

  return (
    <Box className={styles.infoBoxWrapper}>

      <div className={styles.infoBox}>

        {/* header */}
        <div className={styles.header} elevation={1}>

          <div className={styles.titleWrapper}>
            <div className={styles.title} style={{ backgroundColor: bgColor }}>
              {/* header title */}
              <Typography variant="h6" className={styles.titleText} gutterBottom>
                {title}
              </Typography>
              {/* header faded line */}
            </div>
          </div>

          <span data-line={200} className={utilStyles.fadingLine}></span>

        </div> {/* end header */}

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
          </div> {/* end content */}

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
          </div> {/* end content */}

        </div> {/* end body */}

      </div>

    </Box>

  );

}