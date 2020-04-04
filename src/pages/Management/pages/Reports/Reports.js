import React, { useEffect } from 'react';
import EmptyReportsGenerator from './EmptyReportsGenerator/EmptyReportsGenerator';
import styles from './Reports.module.css';
import ExcelReportsGenerator from './ExcelReportsGenerator/ExcelReportsGenerator';

export default props => {

  useEffect(() => {

  });

  return (
    <div className={styles.container}>
      <EmptyReportsGenerator />
      <ExcelReportsGenerator />
    </div>
  );

}