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
  font-size: 12px;
  width: initial;
  text-align: center;
  color:#000000;
  font-style: normal;
  font-weight: 400;
  margin-left: 5px;
`;

const ndts = css`
  margin-left: 3px;
  font-weight: 500;
  color: #000000;
  font-size: 12px;
  font-style: italic;
`;

const Credits = () => {
  return <div className={container}>
    <span className={ndts}>NDTS</span>
    <span className={developedBy}>developed by</span>
  </div>
}

export default Credits;

