import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Spinner from '../../Spinner/Spinner';
import { PieChart } from 'react-minimal-pie-chart';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import {
  paper,
  upper,
  titleWrapper,
  titleText,
  chartWrapper,
  chart,
  bottom,
  incomeWrapper,
  incomeText,
  incomeDescription,
  outcomeWrapper,
  outcomeText,
  outcomeDescription
} from './StatBox.module.css';
import { IoIosCalendar } from 'react-icons/io';

const StatBox = ({ title, income, outcome, unicodeSymbol, titleColor = "#ffffff", loading = true }) => {

  if (loading)
    return <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
      <AlignCenterMiddle style={{ height: "200px" }}><Spinner style={{ fontWeight: 600 }} loadingText={`טוען נתוני ${title}`} size={20} /></AlignCenterMiddle>
    </Grid>

  return <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
    <Paper className={paper} >

      {/* start upper */}
      <div className={upper}>
        <div className={titleWrapper} style={{ background: titleColor }}>
          <Typography variant="h6" className={titleText}>
            {title}
          </Typography>
        </div>

        <div className={chartWrapper}>
          <PieChart
            className={chart}
            paddingAngle={2}
            lineWidth={20}
            totalValue={income + outcome}
            data={[
              { title: 'הוצאות', value: outcome, color: '#1979cc' },
              { title: 'הכנסות', value: income, color: 'rgb(31 173 131)' },
            ]}
          />
        </div>
      </div>
      {/* end upper */}

      {/* start bottom */}
      <div className={bottom}>
        <div className={incomeWrapper}>
          <span className={incomeText} style={{ color: "rgb(31 173 131)" }}>
            {income} {unicodeSymbol}
          </span>
          <span className={incomeDescription}>
            הכנסות
            </span>
        </div>

        <div className={outcomeWrapper}>
          <div className={outcomeText} style={{ color: "#1979cc" }}>
            {outcome} {unicodeSymbol}
          </div>
          <div className={outcomeDescription}>
            הוצאות
              </div>
        </div>
      </div>
      {/* end bottom */}

    </Paper>
  </Grid >
}

export default StatBox;