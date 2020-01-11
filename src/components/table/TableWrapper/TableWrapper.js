import React from 'react';
import styles from './TableWrapper.module.css';
import { Element } from 'react-scroll';

export default ({ children }) => {
  return (
    <Element className={styles.tableWrapper} name="tableElement">
      {children}
    </Element>
  );
}