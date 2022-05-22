import React from 'react';
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
  padding: 45px 15px 60px;
`;

const row = css`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ececec;
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

const outcomeIncomeFlex = css`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const _header = css`
  background: #ffffff;
  padding: 20px;
  font-weight: 500;
  flex-grow: 1;
  font-size: 24px;
  color: #ffffff;
`;

const DonutStatBox = ({ title, income, outcome, unicodeSymbol, color, loading = true, index = 1, border, xs }) => {

  const incomeText = `${income} ${unicodeSymbol}`;
  const outcomeText = `${outcome} ${unicodeSymbol}`;

  return <StatBox title={title} color={color} loading={loading} index={index} border={border} xs={xs}>
    <div className={wrapper}>

      <div className={_header} style={{ background: color }}>
        <span>{title}</span>
      </div>

      <div className={legend}>
        <div className={row}>
          <div className={`${text} ${label}`}>הוצאות</div>
          <div className={`${text} ${outcomeIncomeFlex}`}><span>{outcomeText}</span></div>
        </div>

        <div className={row}>
          <div className={`${text} ${label}`}>הכנסות</div>
          <div className={`${text} ${outcomeIncomeFlex}`}><span>{incomeText}</span></div>
        </div>
      </div>

    </div>
  </StatBox >
}

export default DonutStatBox;
