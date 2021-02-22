// LIBRARIES
import React from "react";
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 20px 0px;
  font-size: 16px;
  color: #000000;
  padding: 8px 15px;
  font-weight: 400;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 7%);
  border-radius: 6px;
  background: #f7f7f7;
  border: 1px solid #cccccc57;
`;

const Breadcrumbs = ({ children = [] }) => {

  return (
    <div className={wrapper}>
      {children}
    </div>
  );

}

export default React.memo(Breadcrumbs);