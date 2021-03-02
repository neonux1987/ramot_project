// LIBRARIES
import React from "react";
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  font-size: 15px;
  color: #555555;
  padding: 10px 20px;
  font-weight: 500;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 7%);
  background: #f7f7f7;
  border: 1px solid #cccccc57;
  border-top: none;
`;

const Breadcrumbs = ({ children = [] }) => {

  return (
    <div className={wrapper}>
      {children}
    </div>
  );

}

export default React.memo(Breadcrumbs);