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
import ReactApexChart from 'react-apexcharts';

const StatBox = ({ title, income, outcome, unicodeSymbol, titleColor = "#555555", loading = true }) => {

  const chart = <div className={chartWrapper}>
    <ReactApexChart options={{
      chart: {
        type: 'donut'
      },
      responsive: [{
        breakpoint: 1400,
        options: {
          chart: {
            width: 220
          },
          legend: {
            position: 'right'
          }
        }
      }]
    }} series={[income, outcome]} type="donut" width="260px" />
  </div>;

  return <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
    <Paper className={paper} >

      {/* start upper */}
      <div className={upper}>
        <div className={titleWrapper}>
          <Typography variant="h6" className={titleText} /* style={{ color: titleColor }} */>
            {title}
          </Typography>
        </div>

      </div>
      {/* end upper */}

      {/* start bottom */}
      <div className={bottom}>
        {loading ? <Loader /> : chart}
      </div>
      {/* end bottom */}

    </Paper>
  </Grid >
}

export default StatBox;

const Loader = () => <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
  <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} size={20} /></AlignCenterMiddle>
</Grid>;