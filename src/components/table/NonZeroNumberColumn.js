import React from 'react';
import Column from './Column';

const NonZeroNumberColumn = ({ children, style, show = true }) => {
  const newNumber = children === 0 ? "" : children;
  return (<Column style={style} show={show} >{newNumber}</Column>);
}

export default NonZeroNumberColumn;