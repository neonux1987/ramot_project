import React from 'react';
import styles from './AlignCenterMiddle.module.css';

export const AlignCenterMiddle = (props) => {
  return <div {...props} className={`${styles.wrapper} ${props.className}`} >{props.children}</div>
}