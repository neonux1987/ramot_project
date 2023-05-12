import { css } from "emotion";
import React from "react";
import FadedDivider from "../CustomDivider/FadedDivider";
import TrendingDownIcon from "../Icons/TrendingDownIcon";
import TrendingUpIcon from "../Icons/TrendingUpIcon";
import StatBox from "./StatBox/StatBox";

const wrapper = css`
  padding: 0 0 40px;
`;

const row = css`
  display: flex;
  align-items: center;
  margin-top: 0;
`;

const label = css`
  font-weight: 400 !important;
`;

const text = css`
  font-size: 32px;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  margin-bottom: 10px;

  @media (max-width: 1400px) {
    font-size: 24px;
  }
`;

const red = css`
  color: red;
`;

const green = css`
  color: green;
`;

const sliderWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const slider = css`
  padding: 15px 30px;
  position: relative;
`;

const headerWrapper = css`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  font-size: 32px;
  font-weight: 500;
  margin-right: 0px;
  color: #000000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;

  @media (max-width: 1400px) {
    font-size: 32px;
  }
`;

const SliderStatBox = ({
  title,
  income,
  outcome,
  color,
  loading = true,
  index = 1,
  border = false,
  xs
}) => {
  //const total = income + outcome;
  //const outcomePercentage = total === 0 ? 0 : (outcome / total) * 100;
  //const incomePercentage = total === 0 ? 0 : (income / total) * 100;

  let trendingUp = outcome > income;

  return (
    <StatBox
      title={title}
      color={color}
      loading={loading}
      index={index}
      border={border}
      xs={xs}
    >
      <div className={wrapper}>
        <div className={headerWrapper}>
          <h2 className={titleStyle}>
            <span>{title}</span>
          </h2>
          {trendingUp ? (
            <TrendingUpIcon className={red} />
          ) : (
            <TrendingDownIcon className={green} />
          )}
        </div>

        <FadedDivider />

        <div className={sliderWrapper} style={{ backgroundColor: color }}>
          <div className={slider}>
            <div
              style={{ fontWeight: 500, fontSize: "14px", color: "#ffffff" }}
            >
              הוצאות
            </div>

            <div className={row}>
              <div className={`${text} ${label}`}>
                <span>{outcome}</span>
              </div>
            </div>
          </div>

          <FadedDivider />

          <div className={slider}>
            <div
              style={{ fontWeight: 500, fontSize: "14px", color: "#ffffff" }}
            >
              הכנסות
            </div>

            <div className={row}>
              <div className={`${text} ${label}`}>
                <span>{income}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatBox>
  );
};

export default SliderStatBox;
