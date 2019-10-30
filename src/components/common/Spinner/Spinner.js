import React from 'react';
import { DotLoader } from 'react-spinners';
import styles from './Spinner.module.css';

export default (props) => {
  return (
    <div className={styles.spinner} style={{ color: props.color ? props.color : "#000000", fontWeight: 600 }}>
      <span style={{ margin: "0 5px", display: "flex", alignItems: "center" }}>{props.loadingText}</span>
      <DotLoader style={{ color: props.color ? props.color : "#000000" }} {...props} />
    </div>
  )
}