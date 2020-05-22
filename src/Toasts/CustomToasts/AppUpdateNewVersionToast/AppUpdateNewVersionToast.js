import React from 'react';
import { container, button } from './AppUpdateNewVersionToast.module.css';
import { downloadUpdate } from '../../../services/updates.svc';

export default ({ version, closeToast }) => {
  return (
    <div className={container}>

      <span>{`גירסה חדשה ${version} זמינה עכשיו להורדה`}</span>
      <br />
      <span>להורדת העידכון לחץ</span>

      <button
        className={button}
        onClick={() => {
          console.log("downloading");
          downloadUpdate();
          closeToast();
        }}
      >הורד</button>

    </div>
  );
}