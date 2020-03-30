import React, { Fragment } from 'react';
import ReportsGenerator from './ReportsGenerator/ReportsGenerator';
import styles from './Reports.module.css'
export default props => {

  return (
    <div className={styles.container}>
      <ReportsGenerator />
      <div>
        מייצר דוחות אוטומטי
  </div>
    </div>
  );

}