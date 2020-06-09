import React from 'react';
import styles from './Button.module.css';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';

export default (props) => {
  return <ButtonWithSound className={props.className || styles.btn} onClick={props.onClick} {...props}>
    {props.children}
  </ButtonWithSound>
}