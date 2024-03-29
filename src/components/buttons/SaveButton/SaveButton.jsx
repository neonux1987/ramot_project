import React from 'react';
import styles from './Button.module.css';
import { Button } from '@material-ui/core';

const SaveButton = (props) => {
  return <Button className={props.className || styles.btn} onClick={props.onClick} {...props}>
    {props.children}
  </Button>
}

export default SaveButton;