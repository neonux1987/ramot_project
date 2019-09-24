import React from 'react';
import styles from './YesNoDialog.module.css';
import { Done, Close } from '@material-ui/icons';

export default ({ show, closeDialog, deleteHandler }) => {

  const display = show ? "block" : "none";
  return <div className={styles.dialog} style={{ display: display }}>
    <button onClick={() => {
      closeDialog();
      deleteHandler();
    }} className={styles.btn + " " + styles.done}><Done style={{ fontSize: "22px" }} /></button>
    <button onClick={closeDialog} className={styles.btn + " " + styles.close}><Close style={{ fontSize: "22px" }} /></button>
  </div>
}