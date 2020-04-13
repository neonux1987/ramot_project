import React from 'react';

import { Button } from "@material-ui/core"
import styles from './Button.module.css';

export default (props) => {
  return <Button className={props.className || styles.btn} onClick={props.onClick} {...props}>
    {props.children}
  </Button>
}