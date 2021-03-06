import React from 'react';
import { css } from 'emotion';

const style = css`
  background-color: #fafafa;
  background: #eceeef;
  /* background-color: #fdfdfd; */
  /* background: linear-gradient(0deg, #fafafa 0%, #ffffff 100%) */
  z-index: 999;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.17);
  /* box-shadow: 0px 0px 20px 0px rgba(44, 101, 144, 0.1); */
  /* box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px; */
  /* border-bottom: 1px solid #0000000d; */
  flex-basis: 36px;
  /* background: #353c40; */
`;

const AppFrame = props => {
  return <div className={style}>
    {props.children}
  </div>;
}

export default AppFrame;