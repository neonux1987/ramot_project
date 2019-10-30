import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import InfoBox from '../../../common/InfoBox/InfoBox';
import styles from './Stats.module.css';
import Helper from '../../../../helpers/Helper';
import Spinner from '../../../common/Spinner/Spinner';

export default (props) => {

  const boxColor = "#fff";

  const renderMonthStatsBoxes = [];

  const quarterMonths = Helper.getQuarterMonths(props.quarter);

  const monthColors = ["rgb(241, 59, 59)", "rgb(57, 130, 173)", "rgb(41, 169, 134)", "rgb(126, 91, 183)"]

  for (let i = 0; i < quarterMonths.length; i++) {

    if (props.isFetching) {
      renderMonthStatsBoxes[i] = <div key={i} className={styles.loadingWrapper}><Spinner style={{fontWeight: 600}} loadingText={`טוען נתוני חודש ${Helper.convertEngToHebMonth(quarterMonths[i])}`} size={20} /></div>;
    }else{

      const monthTitle = Helper.convertEngToHebMonth(props.monthStats[i] ? props.monthStats[i].month : quarterMonths[i]);
      const totalExpanses = props.monthStats[i] ? props.monthStats[i].total_expanses : 0;
      const totalBudget = props.monthStats[i] ? props.monthStats[i].total_budget : 0;

      renderMonthStatsBoxes[i] = <InfoBox key={i} wrapper={styles.infoBox} boxColor={boxColor}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" style={{ color: monthColors[i] }} className={styles.title} gutterBottom>
            {monthTitle}
          </Typography>
        </Paper>

        <Paper className={styles.body}>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            הכנסות: <span style={{ color: "green" }}>{totalBudget} ש"ח</span>
          </Typography>
          <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
            הוצאות: <span style={{ color: "red" }}>{totalExpanses} ש"ח</span>
          </Typography>
        </Paper>
      </InfoBox>;

    }

    
  }

  const renderQuarterStatsBox = props.isFetching ? <div className={styles.loadingWrapper}><Spinner style={{fontWeight: 600}} loadingText={"טוען נתוני סוף רבעון"} size={20} /></div> : <InfoBox wrapper={styles.infoBox} boxColor={boxColor}>
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
</InfoBox>;

  return (
    <div>
      {renderMonthStatsBoxes}
      {renderQuarterStatsBox}
    </div>
  );

}