import React from 'react';
import { css } from 'emotion';

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  border-bottom: 1px solid #00000029;
  padding-bottom: 10px;
  z-index: 3;
  position: relative;
`;

const Controls = props => {
  return <div className={container}>
    {props.children}
  </div>;
}

export default Controls;