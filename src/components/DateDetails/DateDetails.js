import React from 'react';
import styles from './DateDetails.module.css';

export default ({ month, quarter, year }) => {

  const monthRender = month ? `/ חודש ${month}` : "";
  const quarterRender = quarter ? `/ רבעון ${quarter}` : "";
  const yearRender = year ? `שנה ${year}` : "";

  const render = year === undefined && quarter === undefined && month === undefined ?
    "לא נבחר תאריך" :
    `${yearRender} ${quarterRender} ${monthRender}`;

  return (
    <div className={styles.wrapper}>
      <span style={{ fontWeight: "600" }}>תאריך הנתונים:</span>
      <span className={styles.marginText}>{render}</span>
    </div>
  );

}