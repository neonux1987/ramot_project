import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import Spinner from '../../Spinner/Spinner';
import { PieChart } from 'react-minimal-pie-chart';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import {
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

const first = css`
  background: linear-gradient( 60deg , #ffa726, #fb8c00);
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%);
  margin-top: -40px;
  height: 80px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const second = css`
  background: linear-gradient( 60deg , #66bb6a, #43a047);
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(76 175 80 / 40%);
  margin-top: -40px;
  height: 80px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const third = css`
  background: linear-gradient( 60deg , #ef5350, #e53935);
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(244 67 54 / 40%);
  margin-top: -40px;
  height: 80px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const forth = css`
  background: linear-gradient(60deg, #26c6da, #00acc1);
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 40%);
  margin-top: -40px;
  height: 80px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const fifth = css`
  background: linear-gradient( 60deg , #ffa726, #fb8c00);
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%);
  margin-top: -40px;
  height: 80px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({ title, income, outcome, unicodeSymbol, titleColor = "#ffffff", loading = true }) => {

  if (loading)
    return <AlignCenterMiddle style={{ height: "200px" }}><Spinner style={{ fontWeight: 600 }} loadingText={`טוען נתוני ${title}`} size={20} /></AlignCenterMiddle>


  return <div className={container} /* style={{ borderTop: `8px solid ${titleColor}` }} */>
    <div className={upper}>

      <div className={titleWrapper} style={{ background: titleColor }}>
        {/* <MdDateRange style={{ color: titleColor, fontSize: "2.5em" }} /> */}
        <Typography variant="h6" className={titleText} /* style={{ color: titleColor }} */>
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
            { title: 'הוצאות', value: outcome, color: 'rgb(255 0 82)' },
            { title: 'הכנסות', value: income, color: '#1979cc' },
          ]}
        />
      </div>

    </div>

    <div className={bottom}>

      <div className={incomeWrapper}>
        <span className={incomeText} style={{ color: "rgb(25, 121, 204)" }}>
          {income} {unicodeSymbol}
        </span>
        <span className={incomeDescription}>
          הכנסות
            </span>
      </div>

      <div className={outcomeWrapper}>
        <div className={outcomeText} style={{ color: "rgb(255 0 82)" }}>
          {outcome} {unicodeSymbol}
        </div>
        <div className={outcomeDescription}>
          הוצאות
              </div>
      </div>

    </div>
  </div>

}