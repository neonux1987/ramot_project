import React from 'react';
import { css } from 'emotion';

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  z-index: 3;
  position: relative;
  background: #ffffff1c;
  margin: 15px 20px 0;
  border-radius: 3px;
`;

const Controls = props => {
  return <div className={container} style={{ background: props.bgColor }}>
    {props.children}
  </div>;
}

export default Controls;