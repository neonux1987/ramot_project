import React from 'react';
import classnames from 'classnames';
import { separator } from './Separator.module.css';

const Separator = props => {
  const { title, style, className, children } = props;
  return (
    <div style={{ ...style }} className={classnames(separator, className)}>{title || children}</div>
  )
}

export default Separator;