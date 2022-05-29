import React from 'react';
import useIcons from '../../customHooks/useIcons';
import StatBox from './StatBox/StatBox';
import { css } from 'emotion';
import SliderChart from '../charts/SliderChart';

const wrapper = css`
  flex-grow: 1;
  min-height: 280px;

  @media (max-width: 1400px) {
    min-height: 240px;
  }
`;

const legend = css`
  padding: 40px 20px 0;
`;

const row = css`
  display: flex;
  align-items: center;
  margin-top: -15px;
`;

const label = css`
  font-weight: 400 !important;
`;

const text = css`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const marker = css`
  width: 24px;
  height: 4px;
  background-color: red;
  margin-left: 10px;
`;

const blue = css`
  background-color: rgb(23 146 239);
`;

const green = css`
  background-color: rgb(23 208 145);
`;

const sliderWrapper = css`
  padding: 0 20px;
  position: relative;
`;

const outcomeIncomeFlex = css`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const headerWrapper = css`
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const titleStyle = css`
  margin: 0;
  font-size: 32px;
  font-weight: 500;
  margin-right: 0;

  @media (max-width: 1400px) {
    font-size: 28px;
  }
`;

const iconWrapper = css`
  padding: 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: rgb(20 20 20 / 12%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(20 20 20 / 7%) 0rem 0.125rem 0.25rem -0.0625rem;
`;

const emptyStyle = css`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding-top: 40px;
  font-weight: 400;

  @media (max-width: 1400px) {
    font-size: 16px;
  }
`;

const DonutStatBox = ({ title, income, outcome, unicodeSymbol, color, loading = true, index = 1, border, xs }) => {
  const [generateIcon] = useIcons();

  const incomeText = `${income} ${unicodeSymbol}`;
  const outcomeText = `${outcome} ${unicodeSymbol}`;
  const total = income + outcome;
  const outcomePercentage = total === 0 ? 0 : (outcome / total) * 100;
  const incomePercentage = total === 0 ? 0 : (income / total) * 100;

  const CalendarIcon = generateIcon("calendar", { width: "32px", height: "32px" });

  return <StatBox title={title} color={color} loading={loading} index={index} border={border} xs={xs}>
    <div className={wrapper}>

      <div className={headerWrapper}>
        {/* <div className={iconWrapper} style={{ backgroundColor: color }}>
          <CalendarIcon color="#ffffff" style={{ padding: "6px" }} />
        </div> */}
        <h2 className={titleStyle}>{title}</h2>
      </div>

      {(outcome > 0 || income > 0) && <div>
        <div className={sliderWrapper}>
          <SliderChart value={outcomePercentage} color={"rgb(23 146 239)"} />
          <div className={row}>
            <div className={`${text} ${label}`}>{`${outcome} הוצאות`}</div>
          </div>
        </div>
        <div className={sliderWrapper}>
          <SliderChart value={incomePercentage} color={"rgb(23 208 145)"} />
          <div className={row}>
            <div className={`${text} ${label}`}>{`${income} הכנסות`}</div>
          </div>
        </div>
      </div>}



      {income === 0 && outcome === 0 && <div className={emptyStyle}>אין הוצאות ואין הכנסות</div>}

    </div>
  </StatBox >
}

export default DonutStatBox;