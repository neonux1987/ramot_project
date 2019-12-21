import React from 'react';
import styles from './DateDetails.module.css';
import classnames from 'classnames';

export default ({ month, quarter, year }) => {

  const monthRender = month ? `/ חודש ${month}` : "";
  const quarterRender = quarter ? `/ רבעון ${quarter}` : "";
  const yearRender = year ? `שנה ${year}` : "";

  return (
    <div className={styles.wrapper}>
      <span style={{ fontWeight: "600" }}>תאריך הנתונים:</span>
      <span className={styles.marginText}>{`${yearRender} ${quarterRender} ${monthRender}`}</span>
    </div>
  );

}