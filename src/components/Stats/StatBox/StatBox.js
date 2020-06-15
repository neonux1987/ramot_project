import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles, {
  container,
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
import Spinner from '../../Spinner/Spinner';
import { PieChart } from 'react-minimal-pie-chart';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';

export default ({ title, income, outcome, unicodeSymbol, titleColor = "#000000", loading = true }) => {

  if (loading)
    return <AlignCenterMiddle style={{ height: "200px" }}><Spinner style={{ fontWeight: 600 }} loadingText={`טוען נתוני ${title}`} size={20} /></AlignCenterMiddle>


  return <div className={container}>
    <div className={upper}>

      <div className={titleWrapper}>
        <Typography variant="h6" className={titleText} style={{ color: titleColor }} gutterBottom>
          {title}
        </Typography>
      </div>

      <div className={chartWrapper}>
        <PieChart
          className={chart}
          paddingAngle={5}
          lineWidth={20}
          totalValue={income + outcome}
          data={[
            { title: 'הוצאות', value: outcome, color: 'rgb(249, 89, 118)' },
            { title: 'הכנסות', value: income, color: 'rgb(33, 160, 197)' },
          ]}
        />
      </div>

    </div>

    <div className={bottom}>

      <div className={incomeWrapper}>
        <span className={incomeText} style={{ color: "rgb(19, 133, 167)" }}>
          {income} {unicodeSymbol}
        </span>
        <span className={incomeDescription}>
          הכנסות
            </span>
      </div>

      <div className={outcomeWrapper}>
        <div className={outcomeText} style={{ color: "rgb(247, 45, 82)" }}>
          {outcome} {unicodeSymbol}
        </div>
        <div className={outcomeDescription}>
          הוצאות
              </div>
      </div>

    </div>
  </div>

}