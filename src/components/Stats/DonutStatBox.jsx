import React from 'react';
import DonutChart from '../charts/DonutChart';
import StatBox from './StatBox/StatBox';
import { css } from 'emotion';

const wrapper = css`
  flex-grow: 1;
  @media (max-width: 1400px) {
    flex-direction: column-reverse;
    margin-top: 0px;
  }
`;

const legend = css`
  padding: 10px 15px;
  margin-top: -25px;
  padding-bottom: 25px;
  
  @media (max-width: 1400px) {
    margin-top: -10px;
    padding: 0 5px;
    padding-bottom: 15px;
  }
`;

const row = css`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px dotted #dddddd;
`;

const label = css`
  font-weight: 600 !important;
`;

const text = css`
  font-size: 18px;
  font-weight: 400;
  color: #000000;

  @media (max-width: 1400px) {
    font-size: 16px;
  }
`;

const marker = css`
  width: 16px;
  height: 16px;
  background-color: red;
  margin-left: 10px;
  border-radius: 100px;

  @media (max-width: 1400px) {
    width: 12px;
    height: 12px;
    margin-left: 3px;
  }
`;

const blue = css`
  background-color: rgb(0, 143, 251);
`;

const green = css`
  background-color: rgb(0, 227, 150);
`;

const donutWrapper = css`
  display: flex;
  justify-content: center;
  padding: 15px 10px 0;
  position: relative;

  @media (max-width: 1400px) {
    padding: 15px 5px 0;
  }
`;

const outcomeIncomeFlex = css`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const DonutStatBox = ({ title, income, outcome, unicodeSymbol, color, loading = true, index = 1, border, xs }) => {

  const incomeText = `${income} ${unicodeSymbol}`;
  const outcomeText = `${outcome} ${unicodeSymbol}`;

  return <StatBox title={title} color={color} loading={loading} index={index} border={border} xs={xs}>
    <div className={wrapper}>

      <div className={donutWrapper}>

        <DonutChart
          series={[
            {
              data: [{ name: "הוצאות", y: outcome, color: "#30a3fc" }, { name: "הכנסות", y: income, color: "#30e8aa" }]
            }
          ]}
          title={title}
        />
      </div>

      <div className={legend}>
        <div className={row}>
          <div className={`${marker} ${blue}`}></div>
          <div className={`${text} ${label}`}>הוצאות</div>
          <div className={`${text} ${outcomeIncomeFlex}`}><span>{outcomeText}</span></div>
        </div>

        <div className={row} style={{ border: "none" }}>
          <div className={`${marker} ${green}`}></div>
          <div className={`${text} ${label}`}>הכנסות</div>
          <div className={`${text} ${outcomeIncomeFlex}`}><span>{incomeText}</span></div>
        </div>
      </div>

    </div>
  </StatBox >
}

export default DonutStatBox;