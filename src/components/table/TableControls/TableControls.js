import React from 'react';
import styles from './TableControls.module.css';

const TableControls = ({ style, rightPane, middlePane, leftPane, editMode }) => {
  const editModeColor = editMode ? "#33af37" : "#ff2864";
  const editModeText = editMode ? "פעיל" : "כבוי";

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.controls}>

        <div className={styles.rightPane}>{rightPane}</div>

        <div className={styles.editModeWrapper} style={{ fontWeight: "600" }}>
          <span>מצב עריכה</span>
          <span className={styles.marginText} style={{
            padding: "0 7px",
            color: editModeColor,
            borderRadius: "4px",
            marginRight: "5px"
          }}>{editModeText}</span>
        </div>

        <div className={styles.middlePane}>{middlePane}</div>

        <div className={styles.leftPane}>{leftPane}</div>

      </div>
    </div>
  );
}


export default TableControls;