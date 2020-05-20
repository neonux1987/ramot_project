import React from 'react';
import { container, button } from './AppUpdateToast.module.css';

export default () => {
  return (
    <div className={container}>

      <span>יצא עידכון תוכנה חדש גירסה 1.0.1</span>
      <br />
      <span>לביצוע העידכון לחץ</span>

      <button
        className={button}
        onClick={() => {
          console.log("updating");
        }}
      >עדכן</button>

    </div>
  );
}