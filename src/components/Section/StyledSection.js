import React from 'react';
import { css } from 'emotion';

const container = css`
  margin: 20px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
  border-radius: 6px;
`;

const header = css`
  height: 60px;
`;

const titleBox = css`
  margin: 20px;
  border-radius: 6px;
  width: 320px;
  height: 80px;
  background-color: rgb(28 102 165);
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%);
`;

const content = css`
  margin: 20px;
`;

const StyledSection = ({ children }) => {
  return <div className={container}>
    {/* header */}
    <div role="header" className={header}>
      {/* title box */}
      <div role="title box" className={titleBox}>

      </div>
      {/* end title box */}
    </div>
    {/* end header */}

    {/* content */}
    <div role="content" className={content}>
      {children}
    </div>
    {/* end content */}
  </div>

}

export default StyledSection;