import React from 'react';
import { css } from 'emotion';

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  z-index: 3;
  position: relative;
  background: #02fb8830;
  margin: 15px 30px 20px;
  border-radius: 3px;
`;

const Controls = props => {
  return <div className={container}>
    {props.children}
  </div>;
}

export default Controls;