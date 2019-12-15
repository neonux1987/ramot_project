import React from 'react';
import styles from './TableWrapper.module.css';

export default ({ children }) => {
  return (
    <div className={styles.tableWrapper}>
      {children}
    </div>
  );
}