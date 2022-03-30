// LIBRARIES
import React from "react";
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 15px;
  font-size: 14px;
  color: #555555;
  font-weight: 400;
  border-top: none;
  box-shadow: 0 5px 4px 0px #00000012;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;
`;

const Breadcrumbs = ({ children = [] }) => {

  return (
    <div className={wrapper}>
      {children}
    </div>
  );

}

export default React.memo(Breadcrumbs);