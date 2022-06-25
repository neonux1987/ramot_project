import React from "react";
import "./style.css";
import logo from "./ramot group.png";

const AppLoadingView = () => {
  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} width="60px" height="60px" alt="logo" />
      </div>

      <div className="mainTitle">
        <h1>קבוצת רמות</h1>
      </div>
      <div className="subTitle">
        <h3>ניהול הוצאות והכנסות</h3>
      </div>

      <div className="loadingText">
        <h1>מאתחל אפליקציה</h1>
      </div>

      <div className="gif"></div>
    </div>
  );
};

export default AppLoadingView;
