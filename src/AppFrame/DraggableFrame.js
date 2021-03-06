import React from 'react';
import { css } from 'emotion';

const style = css`
  position: absolute;
  height: 32px;
  display: flex;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 0px;
  -webkit-app-region: drag;
`;

const DraggableFrame = props => {
  return <div className={style}>
    {props.children}
  </div>;
}

export default DraggableFrame;