import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import InfoBox from '../../../common/InfoBox/InfoBox';
import styles from './Stats.module.css';
import Helper from '../../../../helpers/Helper';
import Spinner from '../../../common/Spinner/Spinner';

export default (props) => {

  //background color of the boxes
  const boxColor = "#fff";

  //where the boxes will be stored fo render
  const renderMonthStatsBoxes = [];

  //list of strings of qurter months
  const quarterMonths = Helper.getQuarterMonths(props.quarter);

  //the colors for the text of the month titles
  const monthColors = ["rgb(251, 67, 74)", "rgb(2, 144, 254)", "rgb(41, 169, 134)", "rgb(70, 191, 138)"];

  //unicode shekel icon
  const shekelUnicode = '\u20AA';

  for (let i = 0; i < quarterMonths.length; i++) {

    //render loading if still fetching the stats
    if (props.isFetchingMonthStats) {
      renderMonthStatsBoxes[i] = <div key={i} className={styles.loadingWrapper}><Spinner style={{ fontWeight: 600 }} loadingText={`טוען נתוני חודש ${Helper.convertEngToHebMonth(quarterMonths[i])}`} size={20} /></div>;
    } else {

      const monthTitle = Helper.convertEngToHebMonth(props.monthStats[i] ? props.monthStats[i].month : quarterMonths[i]);
      const outcome = props.monthStats[i] ? props.monthStats[i].outcome : 0;
      const income = props.monthStats[i] ? props.monthStats[i].income : 0;

      renderMonthStatsBoxes[i] = <InfoBox key={i} wrapper={styles.infoBox} boxColor={boxColor}>
        <Paper className={styles.header} elevation={1}>
          <Typography variant="h6" style={{ color: monthColors[i] }} className={styles.title} gutterBottom>
            {monthTitle}
          </Typography>
        </Paper>

        <Paper className={styles.body}>

          <div>
            <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
              הכנסות: <span style={{ color: "rgb(0, 164, 91)" }}>{income} {shekelUnicode}</span>
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
              הוצאות: <span style={{ color: "rgb(247, 85, 53)" }}>{outcome} {shekelUnicode}</span>
            </Typography>
          </div>


        </Paper>
      </InfoBox>;

    }


  }

  const renderQuarterStatsBox = props.isFetchingQuarterStats ? <div className={styles.loadingWrapper}><Spinner style={{ fontWeight: 600 }} loadingText={"טוען נתוני סוף רבעון"} size={20} /></div> : <InfoBox wrapper={styles.infoBox} boxColor={boxColor}>
    <Paper className={styles.header} elevation={1}>
      <Typography variant="h6" style={{ color: "rgb(150, 70, 191)" }} className={styles.title} gutterBottom>
        סוף רבעון
      </Typography>
    </Paper>

    <Paper className={styles.body}>
      <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
        הכנסות: <span style={{ color: "rgb(0, 164, 91)" }}>{props.quarterStats[0].income || 0} {shekelUnicode}</span>
      </Typography>
      <Typography variant="subtitle2" className={styles.expansesTitle} gutterBottom>
        הוצאות: <span style={{ color: "rgb(247, 85, 53)" }}>{props.quarterStats[0].outcome || 0} {shekelUnicode}</span>
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