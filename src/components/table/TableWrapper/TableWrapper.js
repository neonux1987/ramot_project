import React from 'react';
import styles from './TableWrapper.module.css';
import { Element } from 'react-scroll';

// name tableElement is used for 
// scrollTo functionality
const TableWrapper = ({ children, id }) => {
  return (
    <Element id={id} className={styles.tableWrapper} name="tableElement">
      {children}
    </Element>
  );
}

export default TableWrapper;