import React from 'react';
import { css } from 'emotion';

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-left: 1px solid #f3f3f3; */
  padding-top: 10px;
  /* border-top: 1px solid #0000000d; */
  border-bottom: 1px solid #00000029;
  padding-bottom: 10px;
  /* background: #f3f3f3; */
`;

const Controls = props => {
  return <div className={container}>
    {props.children}
  </div>;
}

export default Controls;