import React, { Fragment, useEffect } from 'react';
import ReportsGenerator from './ReportsGenerator/ReportsGenerator';
import { generateEmptyReports } from '../../../../services/reportsGenerator.svc';
import styles from './Reports.module.css';

export default props => {

  useEffect(() => {

  });

  return (
    <div className={styles.container}>
      <ReportsGenerator />
      <div>
        מייצר דוחות אוטומטי
  </div>
    </div>
  );

}