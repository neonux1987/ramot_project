import React from 'react';
import { DotLoader } from 'react-spinners';
import styles from './Spinner.module.css';

export default ({ wrapperClass,spinnerClass, color = "#000000", loadingText, size = 30 }) => {
  return (
    <div className={wrapperClass || ""}>
      <div className={spinnerClass || styles.spinner} style={{ color: color, fontWeight: 600 }}>
        <span style={{ margin: "0 5px", display: "flex", alignItems: "center" }}>{loadingText}</span>
        <DotLoader style={{ color: color }} size={size} />
      </div>
    </div>
  )
}