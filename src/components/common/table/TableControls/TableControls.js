import React from 'react';
import styles from './TableControls.module.css';

const TableControls = (props) => (
  <div className={styles.wrapper}>
    <div className={styles.controls}>
      <div className={styles.rightPane}>{props.rightPane}</div>
      <div className={styles.middlePane}>{props.middlePane}</div>
      <div className={styles.leftPane}>{props.leftPane}</div>
    </div>
  </div>
);


export default TableControls;