import React from "react";
import useIcons from "../../customHooks/useIcons";
import StatBox from "./StatBox/StatBox";
import { css } from "emotion";
import SliderChart from "../charts/SliderChart";
import FadedDivider from "../CustomDivider/FadedDivider";

const wrapper = css`
  flex-grow: 1;
  box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  background-color: #ffffff;
  min-height: 290px;
  border-radius: 14px;
  border: 1px solid #dddddd;
  overflow: hidden;
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
  padding: 15px 20px 0px;
  display: flex;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  font-size: 42px;
  font-weight: 500;
  margin-right: 0px;
  color: #000000;

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
  font-size: 14px;
  padding-top: 30px;
  font-weight: 400;
  padding: 20px;
  text-align: center;
  color: #b5b5b5;
  letter-spacing: 2px;

  @media (max-width: 1400px) {
    font-size: 16px;
  }
`;

const SliderStatBox = ({
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
          <div className={sliderWrapper}>
            <div className={slider}>
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

              <SliderChart
                value={outcomePercentage}
                color={"rgb(23 146 239)"}
              />
            </div>

            <FadedDivider />

            <div className={slider} style={{ padding: "10px 30px 40px" }}>
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

              <SliderChart value={incomePercentage} color={"rgb(23 208 145)"} />
            </div>
          </div>
        )}

        {income === 0 && outcome === 0 && (
          <div className={emptyStyle}>
            <span>אין נתונים</span>
          </div>
        )}
      </div>
    </StatBox>
  );
};

export default SliderStatBox;
