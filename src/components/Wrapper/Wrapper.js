import React from 'react';
import { css } from 'emotion';

const style = css`
  padding: 20px;
`;

const Wrapper = props => {
  const { children, className = "" } = props;

  return <div {...props} className={`${style} ${className}`}>
    {children}
  </div>
}

export default Wrapper;