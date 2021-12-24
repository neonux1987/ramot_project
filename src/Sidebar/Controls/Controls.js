import React from 'react';
import { css } from 'emotion';

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: relative;
  border-left: 1px solid #0000001a;
  margin-left: 15px;
`;

const Controls = props => {
  return <div className={container}>
    {props.children}
  </div>;
}

export default Controls;