import { css } from "emotion";
import React from "react";
import SliderChart from "../charts/SliderChart";
import FadedDivider from "../CustomDivider/FadedDivider";
import StatBox from "./StatBox/StatBox";

const wrapper = css`
  flex-grow: 1;
  padding: 0 0 40px;
`;

const lastStyle = css`
  border-left: none;
  position: absolute;
  top: -10px;
  left: -1px;
  right: -10px;
  bottom: -10px;
  background: #fff;
  box-shadow: rgb(0 0 0 / 23%) 0rem 1.25rem 1.6875rem 0rem;
  padding-top: 0;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  border-radius: 14px;
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
  color: #000000;
  line-height: 32px;
  margin-bottom: 10px;

  @media (max-width: 1400px) {
    font-size: 24px;
  }
`;

const blue = css`
  color: rgb(23 146 239);
`;

const green = css`
  color: rgb(23 208 145);
`;

const sliderWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
`;

const slider = css`
  padding: 10px 30px;
  position: relative;
`;

const headerWrapper = css`
  padding: 20px 30px 10px;
  display: flex;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  font-size: 42px;
  font-weight: 500;
  margin-right: 0px;
  color: #000000;
  color: #fff;
  border-radius: 10px;
  max-width: 180px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
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
  border,
  xs,
  last = false
}) => {
  const total = income + outcome;
  const outcomePercentage = total === 0 ? 0 : (outcome / total) * 100;
  const incomePercentage = total === 0 ? 0 : (income / total) * 100;

  const lastBorderStyle = css`
    border: 2px solid ${color} !important;
  `;

  return (
    <StatBox
      title={title}
      color={color}
      loading={loading}
      index={index}
      border={border}
      xs={xs}
    >
      <div
        className={`${wrapper} ${last ? lastStyle : ""}`}
        style={{
          borderLeft: border ? "1px solid #dddddd" : "none"
        }}
      >
        <div className={headerWrapper}>
          <h2
            className={titleStyle}
            style={{
              color
            }}
          >
            <span>{title}</span>
          </h2>
        </div>

        <FadedDivider />

        <div className={sliderWrapper}>
          <div className={slider}>
            <div className={blue} style={{ fontWeight: 500, fontSize: "14px" }}>
              הוצאות
            </div>

            <div className={row}>
              <div className={`${text} ${label}`}>
                <span>{outcome}</span>
              </div>
            </div>

            <SliderChart value={outcomePercentage} color={"rgb(23 146 239)"} />
          </div>

          <FadedDivider />

          <div className={slider}>
            <div
              className={green}
              style={{ fontWeight: 500, fontSize: "14px" }}
            >
              הכנסות
            </div>

            <div className={row}>
              <div className={`${text} ${label}`}>
                <span>{income}</span>
              </div>
            </div>

            <SliderChart value={incomePercentage} color={"rgb(23 208 145)"} />
          </div>
        </div>
      </div>
    </StatBox>
  );
};

export default SliderStatBox;
