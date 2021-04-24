import React from 'react';
import Cell from './Cell';

const GroupCell = ({ color = "#000000", span = 1, children }) => {
  return <Cell
    className="groupCell"
    style={{
      color,
      gridColumn: `span ${span}`
    }}
  >
    {children}
  </Cell>
}

export default GroupCell;