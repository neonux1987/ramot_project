import React from 'react';
import styles from './AppFrame.module.css';

export default ({ close, minimize, maximize }) => {
  return (
    <div className={styles.appFrame}>
      <div className={styles.section + " " + styles.header}>
        ניהול דוחות - NDT Solutions
      </div>
      <div className={styles.section}>
        <div className={styles.controls}>
          <button onClick={minimize}>-</button>
          <button onClick={maximize}>+</button>
          <button onClick={close}>x</button>
        </div>
      </div>
    </div>
  );
}