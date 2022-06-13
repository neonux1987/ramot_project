import React from "react";
import StatBox from "./StatBox/StatBox";
import { css } from "emotion";
import DonutChart from "../charts/DonutChart";
import FadedDivider from "../CustomDivider/FadedDivider";

const wrapper = css`
  flex-grow: 1;
`;

const row = css`
  margin-top: 0;

  @media (max-width: 1400px) {
    display: block;
  }
`;

const labelWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  width: 70px;
  font-weight: 500;
  color: #ffffff;
  border-radius: 4px;
`;

const text = css`
  font-size: 32px;
  font-weight: 400;
  color: #000000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0 5px;
`;

const blue = css`
  background: rgb(23 146 239);
`;

const green = css`
  background: rgb(23 208 145);
`;

const sliderWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  background-color: #ffffff;
  min-height: 380px;
  border-radius: 14px;
  border: 1px solid #dddddd;
  overflow: hidden;
`;

const slider = css`
  padding: 5px 30px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const headerWrapper = css`
  padding: 0 10px 10px;
  display: flex;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  font-size: 42px;
  font-weight: 500;
  margin-right: 0px;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const emptyStyle = css`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding-top: 30px;
  font-weight: 400;
  padding: 20px;
  text-align: center;
  color: #b5b5b5;
  box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  background-color: #ffffff;
  min-height: 380px;
  border-radius: 14px;
  border: 1px solid #dddddd;
`;

const ribbon = css`
  filter: drop-shadow(2px 3px 2px rgb(0 0 0 / 21%));
  position: absolute;
  top: 0;
  right: 30px;
  z-index: 888;

  @media (max-width: 1650px) {
    right: 20px;
  }
`;

const ribbonContent = css`
  width: 60px;
  height: 65px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 18px), 0 100%);
  transition: clip-path 1s, height 1s, width 1s, background 1s;

  @media (max-width: 1400px) {
    width: 40px;
    height: 45px;
    transition: clip-path 1s, height 1s, width 1s, background 1s;
  }

  @media (min-width: 1400px) and (max-width: 1650px) {
    width: 50px;
    height: 55px;
    transition: clip-path 1s, height 1s, width 1s, background 1s;
  }
`;

const DonutStatBox = ({
  title,
  income,
  outcome,
  unicodeSymbol,
  color,
  loading = true,
  index = 1,
  border,
  xs,
}) => {
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
          <h2 className={titleStyle}>{title}</h2>
        </div>

        {(outcome > 0 || income > 0) && (
          <div className={sliderWrapper}>
            <div className={ribbon}>
              <div
                className={ribbonContent}
                style={{
                  background: `${color} linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%)`,
                }}
              ></div>
            </div>

            <div className={slider}>
              <DonutChart
                series={[
                  {
                    data: [
                      { name: "הוצאות", y: outcome, color: "#30a3fc" },
                      { name: "הכנסות", y: income, color: "#30e8aa" },
                    ],
                  },
                ]}
              />
            </div>

            <FadedDivider />

            <div className={row}>
              <div className={text}>
                <div className={`${labelWrapper} ${green}`}>
                  <span>הכנסות</span>
                </div>
                <div>{income}</div>
              </div>

              <FadedDivider />

              <div className={text}>
                <div className={`${labelWrapper} ${blue}`}>
                  <span>הוצאות</span>
                </div>
                <div>{outcome}</div>
              </div>
            </div>
          </div>
        )}

        {income === 0 && outcome === 0 && (
          <div className={emptyStyle}>
            <div>אין נתונים</div>
          </div>
        )}
      </div>
    </StatBox>
  );
};

export default DonutStatBox;
