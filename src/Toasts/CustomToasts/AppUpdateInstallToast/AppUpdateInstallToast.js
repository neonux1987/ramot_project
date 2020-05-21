import React from 'react';
import { container, button } from './AppUpdateInstallToast.module.css';

export default ({ version }) => {
  return (
    <div className={container}>

      <span>{`עידכון גירסה ${version} מוכן להתקנה`}</span>
      <br />

      <button
        style={{ marginRight: "0px" }}
        className={button}
        onClick={() => {
          console.log("updating");
        }}
      >בטל</button>
      <button
        className={button}
        onClick={() => {
          console.log("updating");
        }}
      >התקן</button>

    </div>
  );
}