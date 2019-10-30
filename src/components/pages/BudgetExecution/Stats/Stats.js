import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import InfoBox from '../../../common/InfoBox/InfoBox';
import styles from './Stats.module.css';
import Helper from '../../../../helpers/Helper';
import Spinner from '../../../common/Spinner/Spinner';

export default (props) => {

  const boxColor = "#fff";

  const renderStatsBoxes = [];

  const quarterMonths = Helper.getQuarterMonths(props.quarter);

  const monthColors = ["rgb(241, 59, 59)", "rgb(57, 130, 173)", "rgb(41, 169, 134)", "rgb(126, 91, 183)"]

  for (let i = 0; i < quarterMonths.length; i++) {

    const monthTitle = Helper.convertEngToHebMonth(props.monthStats[i] ? props.monthStats[i].month : quarterMonths[i]);
    const totalExpanses = props.monthStats[i] ? props.monthStats[i].total_expanses : 0;
    const totalBudget = props.monthStats[i] ? props.monthStats[i].total_budget : 0;

    renderStatsBoxes[i] = <InfoBox key={i} wrapper={styles.infoBox} boxColor={boxColor}>
      <Paper className={styles.header} elevation={1}>
        <Typography variant="h6" style={{ color: monthColors[i] }} className={styles.title} gutterBottom>
          {monthTitle}
        </Typography>
      </Paper>

      <Paper className={styles.body}>
        <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
          הכנסות: <span style={{ color: "green" }}>{totalExpanses} ש"ח</span>
        </Typography>
        <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
          הוצאות: <span style={{ color: "red" }}>{totalBudget} ש"ח</span>
        </Typography>
      </Paper>
    </InfoBox>;
  }

  if (props.isFetching) {
    return <div className={styles.formSelect} style={this.spinnerWrapperStyle}><Spinner loadingText={"רבעונים"} size={20} /></div>;
  }

  return (
    <div>
      {renderStatsBoxes}
      <InfoBox wrapper={styles.infoBox} boxColor={boxColor}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" style={{ color: "rgb(126, 91, 183)" }} className={styles.title} gutterBottom>
            סוף רבעון
            </Typography>
        </Paper>

        <Paper className={styles.body}>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            הכנסות: <span style={{ color: "green" }}>{props.quarterStats[0].total_budget} ש"ח</span>
          </Typography>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            הוצאות: <span style={{ color: "red" }}>{props.quarterStats[0].total_expanses} ש"ח</span>
          </Typography>
        </Paper>
      </InfoBox>
    </div>
  );

}