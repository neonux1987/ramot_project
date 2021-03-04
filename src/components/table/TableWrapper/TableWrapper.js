import React from 'react';
import styles from './TableWrapper.module.css';

// name tableElement is used for 
// scrollTo functionality
const TableWrapper = ({ children, id }) => {
  return (
    <div id={id} className={styles.tableWrapper} name="tableElement">
      {children}
    </div>
  );
}

export default TableWrapper;