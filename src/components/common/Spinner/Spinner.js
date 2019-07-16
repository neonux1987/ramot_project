import React from 'react';
import { DotLoader } from 'react-spinners';
import styles from './Spinner.module.css';

export default (props) => {
  return (
    <div className={styles.spinner}>
      <span style={{ margin: "0 5px" }}>{props.loadingText}</span>
      <DotLoader {...props} />
    </div>
  )
}