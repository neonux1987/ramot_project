import React from 'react';
import { Paper } from '@material-ui/core';
import styles from './InfoBox.module.css';

export default (props) => {

  return (
    <Paper className={props.wrapper ? props.wrapper : styles.wrapper} style={{backgroundColor: props.boxColor}} elevation={1}>
      {props.children}
    </Paper>
  );

}