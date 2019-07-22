import React from 'react';
import styles from './AppFrame.module.css';

export default ({ handlers }) => {
  return (
    <div className={styles.appFrame}>
      <div className={styles.section + " " + styles.header}>
        <span>NDT Solutions</span> - <span>ניהול דוחות</span>
      </div>
      <div style={{ float: "left" }} className={styles.section}>
        <div className={styles.controls}>
          <button onClick={handlers.minimize}>-</button>
          <button onClick={handlers.maximize}>+</button>
          <button onClick={handlers.close}>x</button>
        </div>
      </div>
    </div>
  );
}