import React from 'react';
import styles from './TableControls.module.css';

const TableControls = ({ style, rightPane, middlePane, leftPane }) => {

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.controls}>

        <div className={styles.rightPane}>{rightPane}</div>

        <div className={styles.middlePane}>{middlePane}</div>

        <div className={styles.leftPane}>{leftPane}</div>

      </div>
    </div>
  );
}


export default TableControls;