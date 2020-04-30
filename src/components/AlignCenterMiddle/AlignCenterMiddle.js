import React from 'react';
import styles from './AlignCenterMiddle.module.css';

export const AlignCenterMiddle = (props) => {
  return <div className={styles.wrapper} {...props}>{props.children}</div>
}