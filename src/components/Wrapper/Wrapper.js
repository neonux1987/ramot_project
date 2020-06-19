import React from 'react';
import { css } from 'emotion';

const style = css`
  padding: 20px;
`;

export default props => {
  const { children, className = "" } = props;

  return <div {...props} className={`${style} ${className}`}>
    {children}
  </div>
}