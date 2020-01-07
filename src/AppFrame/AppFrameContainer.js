import React from 'react';
import styles from './AppFrame.module.css';
import classnames from 'classnames';
import { Minimize, CheckBoxOutlineBlank, Close } from '@material-ui/icons';
import Helper from '../helpers/Helper';

export default ({ handlers }) => {
  return (
    <div className={styles.appFrame}>

      <div className={styles.draggableRegion}>
        <div className={styles.section} style={{ flex: "1 1" }}>
          <div className={styles.header}>
            {/* <span>NDTS</span>&nbsp; */}<span>מז"ח ניהול דוחות</span>
          </div>
        </div>

        <div className={styles.section} style={{ flex: "1 1", display: "flex", justifyContent: "center", fontSize: "13px" }}>
          <div className={styles.date}>
            <span style={{ color: "rgb(33, 117, 79)", marginLeft: "5px" }}>תאריך נוכחי: </span>
            <span style={{ color: "#000000" }}>{`שנה ${Helper.getCurrentYear()} / ${Helper.getCurrentQuarterHeb()} / חודש ${Helper.getCurrentMonthHeb()}`}</span>
          </div>
        </div>

        <div className={styles.section} style={{ flex: "1 1" }}>
          <div className={styles.controls}>
            <button className={styles.button} onClick={handlers.minimize}><Minimize /></button>
            <button className={styles.button} onClick={handlers.maximize}><CheckBoxOutlineBlank /></button>
            <button className={classnames(styles.button, styles.close)} onClick={handlers.close}><Close /></button>
          </div>
        </div>
      </div>

    </div>
  );
}