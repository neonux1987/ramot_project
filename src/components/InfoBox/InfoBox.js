import React from 'react';
import styles from './InfoBox.module.css';
import classnames from 'classnames';

export default ({ month, quarter, year, editMode }) => {

  const monthRender = month ? `/ חודש ${month}` : "";
  const quarterRender = quarter ? `/ רבעון ${quarter}` : "";
  const yearRender = year ? `שנה ${year}` : "";

  const editModeColor = editMode ? "#33af37" : "#ea4141";
  const editModeText = editMode ? "פעיל" : "כבוי";

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flexStart)} style={{ fontWeight: "600" }}>
        <span>מצב עריכה</span>
        <span className={styles.marginText} style={{
          color: "#fff",
          padding: "0 7px",
          backgroundColor: editModeColor,
          borderRadius: "4px"
        }}>{editModeText}</span>
      </div>

      <div className={classnames(styles.section, styles.flexEnd)}>
        <span style={{ fontWeight: "600" }}>תאריך הנתונים:</span>
        <span className={styles.marginText}>{`${yearRender} ${quarterRender} ${monthRender}`}</span>
      </div>

    </div>
  );

}