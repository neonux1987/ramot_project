import React from "react";
import useIcons from "../../customHooks/useIcons";
import StatBox from "./StatBox/StatBox";
import { css } from "emotion";
import DonutChart from "../charts/DonutChart";
import FadedDivider from "../CustomDivider/FadedDivider";

const wrapper = css`
  flex-grow: 1;
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
`;

const marker = css`
  width: 24px;
  height: 4px;
  background-color: red;
  margin-left: 10px;
`;

const blue = css`
  color: rgb(23 146 239);
`;

const green = css`
  color: rgb(23 208 145);
`;

/* const sliderWrapper = css`
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 240px;
  padding-bottom: 0;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  border-radius: 14px;
  position: relative;
  overflow: hidden;

  :after {
    content: "";
    position: absolute;
    top: -45px;
    right: -45px;
    width: 80px;
    height: 80px;
    background: blue;
    transform: rotate(39deg);
  }
`; */

const slider = css`
  padding: 30px 30px;
  position: relative;
`;

const headerWrapper = css`
  padding: 0 5px 5px;
  display: flex;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  font-size: 42px;
  font-weight: 500;
  margin-right: 0px;

  @media (max-width: 1400px) {
    font-size: 28px;
  }
`;

/* const iconWrapper = css`
  padding: 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: rgb(20 20 20 / 12%) 0rem 0.25rem 0.375rem -0.0625rem,
    rgb(20 20 20 / 7%) 0rem 0.125rem 0.25rem -0.0625rem;
  margin-top: 3px;
`; */

const emptyStyle = css`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;
  font-size: 14px;
  padding-top: 30px;
  font-weight: 400;
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  min-height: 240px;
  color: #b5b5b5;
  letter-spacing: 2px;

  @media (max-width: 1400px) {
    font-size: 16px;
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
  const [generateIcon] = useIcons();

  const incomeText = `${income} ${unicodeSymbol}`;
  const outcomeText = `${outcome} ${unicodeSymbol}`;
  const total = income + outcome;
  const outcomePercentage = total === 0 ? 0 : (outcome / total) * 100;
  const incomePercentage = total === 0 ? 0 : (income / total) * 100;

  const CalendarIcon = generateIcon("calendar", {
    width: "32px",
    height: "32px",
  });

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
          {/*           <div className={iconWrapper} style={{ backgroundColor: color }}>
            <CalendarIcon color="#ffffff" style={{ padding: "6px" }} />
          </div> */}
          <h2 className={titleStyle}>{title}</h2>
        </div>

        {(outcome > 0 || income > 0) && (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              min-height: 260px;
              padding-bottom: 0;
              background-color: #ffffff;
              box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
              border-radius: 0;
              position: relative;
              overflow: hidden;

              :after {
                content: "";
                position: absolute;
                top: -45px;
                right: -45px;
                width: 80px;
                height: 80px;
                background: ${color};
                transform: rotate(39deg);
                box-shadow: rgb(0 0 0 / 20%) 0 0 8px 1px;
              }
            `}
          >
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

              <div className={row}>
                <div className={`${text} ${label}`}>
                  <span>{outcome}</span>{" "}
                  <span
                    className={blue}
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    הוצאות
                  </span>
                </div>
              </div>

              <div className={row}>
                <div className={`${text} ${label}`}>
                  <span>{income}</span>{" "}
                  <span
                    className={green}
                    style={{ fontWeight: 400, fontSize: "14px" }}
                  >
                    הכנסות
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {income === 0 && outcome === 0 && (
          <div
            className={css`
              flex-grow: 1;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 260px;
              font-size: 14px;
              padding-top: 30px;
              font-weight: 400;
              padding: 20px;
              text-align: center;
              background-color: #ffffff;
              box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
              min-height: 240px;
              color: #b5b5b5;
              letter-spacing: 2px;
              overflow: hidden;
              position: relative;

              :after {
                content: "";
                position: absolute;
                top: -45px;
                right: -45px;
                width: 80px;
                height: 80px;
                background: ${color};
                transform: rotate(39deg);
                box-shadow: rgb(0 0 0 / 20%) 0 0 8px 1px;
              }

              @media (max-width: 1400px) {
                font-size: 16px;
              }
            `}
          >
            <span>אין נתונים</span>
          </div>
        )}
      </div>
    </StatBox>
  );
};

export default DonutStatBox;
