import React from 'react';
import './style.css';
import logo from './ramot group.png';

const LoadingPage = () => {

  return <div class="wrapper">

    <div class="logo">
      <img src={logo} width="60px" height="60px" alt="logo" />
    </div>

    <div class="mainTitle">
      <h1>קבוצת רמות</h1>
    </div>
    <div class="subTitle">
      <h3>ניהול הוצאות והכנסות</h3>
    </div>

    <div class="loadingText">
      <h1>מאתחל אפליקציה</h1>
    </div>

    <div class="gif"></div>

  </div>

}

export default LoadingPage;