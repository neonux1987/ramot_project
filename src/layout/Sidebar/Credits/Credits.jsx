// LIBRARIES
import React from 'react';
import { css } from 'emotion';

const container = css`
  position: fixed;
  bottom: 0;
  width: 240px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const developedBy = css`
  font-size: 14px;
  width: initial;
  text-align: center;
  color:rgb(107,108,119);
  font-style: normal;
  font-weight: 400;
  margin-left: 5px;
`;

const ndts = css`
  margin-left: 3px;
  font-weight: 600;
  color: rgb(107,108,119);
  font-style: italic;
`;

const version = css`
  color: #d0d0d0;
`;

//ELECTRON
const appVersion = require("electron").remote.app.getVersion();

const Credits = () => {
  return <div className={container}>
    <span className={ndts}>NDTS</span>
    <span className={developedBy}>developed by</span>
    <span className={version}>{`v${appVersion}`}</span>
  </div>
}

export default Credits;

