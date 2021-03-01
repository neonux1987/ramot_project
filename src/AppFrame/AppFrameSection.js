import React from 'react';
import { css } from 'emotion';

const style = css`
  align-items: center;
  display: flex;
  height: 36px;
  position: relative;
  bottom: 4px;
  flex: 1 1;
`;

const AppFrameSection = props => {


  return <div className={style}>
    {props.children}
  </div>;
}

export default AppFrameSection;