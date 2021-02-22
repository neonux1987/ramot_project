import React from 'react';
import { css } from 'emotion';

const _wrapper = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #000000;
  font-size: 16px;
`;

const _label = css`
  font-weight: 500;
`;

const _text = css`
  margin-right: 6px;
`;

const DateDetails = ({ month, quarter, year }) => {

  const monthRender = month ? `/חודש ${month}` : "";
  const quarterRender = quarter ? `/רבעון ${quarter}` : "";
  const yearRender = year ? `שנה ${year}` : "";

  const render = year === undefined && quarter === undefined && month === undefined ?
    "לא נבחר תאריך" :
    `${yearRender} ${quarterRender} ${monthRender}`;

  return (
    <div className={_wrapper}>
      <span className={_label}>נכונות נתונים:</span>
      <span className={_text}>{render}</span>
    </div>
  );

}

export default DateDetails;