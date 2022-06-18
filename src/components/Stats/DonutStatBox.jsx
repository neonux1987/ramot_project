import React from "react";
import StatBox from "./StatBox/StatBox";
import { css } from "emotion";
import DonutChart from "../charts/DonutChart";
import FadedDivider from "../CustomDivider/FadedDivider";
import Ribbon from "./Ribbon";

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
  overflow: visible;
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
  position: relative;
`;

const DonutStatBox = ({
  title,
  income,
  outcome,
  color,
  loading = true,
  index = 1,
  border,
  xs,
  Icon
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
            <Ribbon color={color} Icon={Icon} />
            <div className={slider}>
              <DonutChart
                series={[
                  {
                    data: [
                      { name: "הוצאות", y: outcome, color: "#30a3fc" },
                      { name: "הכנסות", y: income, color: "#30e8aa" }
                    ]
                  }
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
            <Ribbon color={color} Icon={Icon} />
            <div>אין נתונים</div>
          </div>
        )}
      </div>
    </StatBox>
  );
};

export default DonutStatBox;
