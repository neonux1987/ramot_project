import React from 'react';
import { container, button } from './AppUpdateNewVersionToast.module.css';

export default ({ version }) => {
  return (
    <div className={container}>

      <span>{`יצא עידכון תוכנה חדש גירסה ${version}`}</span>
      <br />
      <span>להורדת העידכון לחץ</span>

      <button
        className={button}
        onClick={() => {
          console.log("updating");
        }}
      >הורד</button>

    </div>
  );
}