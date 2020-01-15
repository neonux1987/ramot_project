import React, { useState } from 'react';
import Column from './Column';

export default ({ children, style, onBlurHandler }) => {

  const [select, setSelect] = useState(false);

  const onClick = () => {
    setSelect()
  }
  return select ?
    <Column style={style}>{children}</Column> :
    <Column style={style}>{children}</Column>;
}