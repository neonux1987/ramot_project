import React from 'react';
import styles from './TableWrapper.module.css';
import { Element } from 'react-scroll';

export default ({ children }) => {
  return (
    <div className={styles.tableWrapper}>
      <Element name="table">
        {children}
      </Element>
    </div>
  );
}