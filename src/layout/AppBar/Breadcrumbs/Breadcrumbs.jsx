// LIBRARIES
import React from "react";
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  color: #000000;
  font-weight: 400;
  border-top: none;
  user-select: none;
  flex-grow: 1;
`;

const Breadcrumbs = ({ children = [] }) => {
  return (
    <div className={wrapper}>
      {children}
    </div>
  );
}

export default Breadcrumbs;