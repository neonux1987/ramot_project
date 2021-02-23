import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { css } from 'emotion';
import Column from './Column';

const icon = css`
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-top: -2px;
`;

const HeaderColumn = props => {
  return <Column {...props} innerStyle={{ display: "flex", justtifyConten: "center", alignItems: "center" }}>
    {props.editMode ?
      <FiEdit className={icon} /> : null}
    <div>{props.children}</div>
  </Column>;
};

export default HeaderColumn;