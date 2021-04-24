import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { css } from 'emotion';
import Cell from './Cell';

const icon = css`
  width: 14px;
  height: 14px;
  margin-left: 3px;
  margin-top: -2px;
`;

const HeaderCell = props => {
  return <Cell
    className="headerCell"
    {...props}
  >
    {props.editMode ?
      <FiEdit className={icon} /> : null}
    {props.children}
  </Cell>;
};

export default HeaderCell;