// LIBRARIES
import React from "react";
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
  font-size: 16px;
  color: #555555;
  font-weight: 400;
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