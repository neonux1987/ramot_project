import React from 'react';
import Cell from './Cell';

const NonZeroCell = ({ children, style, innerStyle }) => {
  const newNumber = children === 0 ? "" : children;
  return (<Cell style={{ direction: "ltr", ...style }}>{newNumber}</Cell>);
}

export default NonZeroCell;