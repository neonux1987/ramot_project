import React from 'react';
import { container, button } from './AppUpdateInstallToast.module.css';

const AppUpdateInstallToast = ({ version, closeToast }) => {
  return (
    <div className={container}>

      <span>{`עידכון גירסה ${version} מוכן להתקנה`}</span>
      <br />

      <button
        className={button}
        onClick={() => {
          console.log("installing");
          closeToast();
        }}
      >התקן</button>

    </div>
  );
}

export default AppUpdateInstallToast;