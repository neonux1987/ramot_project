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
  margin-right: -62px;
  user-select: none;
`;

const Breadcrumbs = ({ children = [] }) => {

  return (
    <div className={wrapper}>
      {children}
    </div>
  );

}

export default React.memo(Breadcrumbs);