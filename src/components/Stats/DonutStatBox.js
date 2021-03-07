import React from 'react';
import DonutChart from '../charts/DonutChart';
import StatBox from './StatBox/StatBox';
import { css } from 'emotion';
import classnames from 'classnames';
import { Grow } from '@material-ui/core';

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 200px;
  margin-top: -10px;

  @media (max-width: 1400px) {
    flex-direction: column-reverse;
    width: 160px;
    margin-top: 0px;
    padding-bottom: 20px;
    padding-top: 15px;
  }
`;

const legend = css`
  margin-top: -20px;

  @media (max-width: 1400px) {
    margin-top: 0;
  }
`;

const row = css`
  display: flex;
  align-items: center;
  margin: 2px 5px;
`;

const text = css`
  font-size: 16px;
  font-weight: 400;
`;


const marker = css`
  width: 12px;
  height: 12px;
  background-color: red;
  margin-left: 3px;
  border-radius: 12px;
`;

const blue = css`
  background-color: rgb(0, 143, 251);
`;

const green = css`
  background-color: rgb(0, 227, 150);
`;

const DonutStatBox = ({ title, income, outcome, unicodeSymbol, titleColor = "#555555", loading = true, index = 1 }) => {

  const incomeText = `הכנסות ${income} ${unicodeSymbol}`;
  const outcomeText = `הוצאות ${outcome} ${unicodeSymbol}`;

  return <Grow
    in={true}
    style={{ transformOrigin: '0 0 0' }}
    {...(true ? { timeout: 5000 } : {})}
  >
    <StatBox title={title} titleColor={titleColor} loading={loading}>
      <div className={wrapper}>

        <div className={legend}>
          <div className={row}>
            <div className={classnames(marker, blue)}></div>
            <div className={text}>{outcomeText}</div>
          </div>

          <div className={row}>
            <div className={classnames(marker, green)}></div>
            <div className={text}>{incomeText}</div>
          </div>
        </div>
        <DonutChart series={[outcome, income]} labels={["הוצאות", "הכנסות"]} />

      </div>
    </StatBox >
  </Grow>
}

export default DonutStatBox;
