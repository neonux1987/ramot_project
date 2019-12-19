import React from 'react';
import styles from './InfoBox.module.css';
import classnames from 'classnames';

export default ({ month, quarter, year, editMode }) => {

  const monthRender = month ? `/ חודש ${month}` : "";
  const quarterRender = quarter ? `/ רבעון ${quarter}` : "";
  const yearRender = year ? `שנה ${year}` : "";

  const editModeColor = editMode ? "green" : "red";
  const editModeText = editMode ? "פעיל" : "כבוי";

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flexStart)} style={{ fontWeight: "600" }}>
        <span>מצב עריכה</span>
        <span className={styles.marginText} style={{ color: editModeColor }}>{editModeText}</span>
      </div>

      <div className={classnames(styles.section, styles.flexEnd)}>
        <span style={{ fontWeight: "600" }}>תאריך הנתונים:</span>
        <span className={styles.marginText}>{`${yearRender} ${quarterRender} ${monthRender}`}</span>
      </div>

    </div>
  );

}