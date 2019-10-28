import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import InfoBox from '../../../common/InfoBox/InfoBox';
import styles from './Stats.module.css';

export default () => {

  return (
    <div>
      <InfoBox wrapper={styles.infoBox} boxColor={"#fff"}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" className={styles.title} gutterBottom>
            חודש אוקטובר
            </Typography>
        </Paper>

        <Paper className={styles.body}>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הכנסות: 33,456 שקל
            </Typography>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הוצאות: 33,456 שקל
            </Typography>
        </Paper>
      </InfoBox>

      <InfoBox wrapper={styles.infoBox} boxColor={"#fff"}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" className={styles.title} gutterBottom>
            חודש נובמבר
            </Typography>
        </Paper>

        <Paper className={styles.body}>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הכנסות: 33,456 שקל
            </Typography>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הוצאות: 33,456 שקל
            </Typography>
        </Paper>
      </InfoBox>

      <InfoBox wrapper={styles.infoBox} boxColor={"#fff"}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" className={styles.title} gutterBottom>
            חודש דצמבר
            </Typography>
        </Paper>

        <Paper className={styles.body}>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הכנסות: 33,456 שקל
            </Typography>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הוצאות: 33,456 שקל
            </Typography>
        </Paper>
      </InfoBox>

      <InfoBox wrapper={styles.infoBox} boxColor={"#fff"}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" className={styles.title} gutterBottom>
            סוף רבעון
            </Typography>
        </Paper>

        <Paper className={styles.body}>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הכנסות: 33,456 שקל
            </Typography>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            סה"כ הוצאות: 33,456 שקל
            </Typography>
        </Paper>
      </InfoBox>
    </div>
  );

}