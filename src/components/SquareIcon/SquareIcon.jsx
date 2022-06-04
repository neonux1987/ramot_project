import React from 'react';
import { css } from 'emotion';

const iconWrapper = css`
  padding: 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: rgb(20 20 20 / 12%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(20 20 20 / 7%) 0rem 0.125rem 0.25rem -0.0625rem;
  width: 32px;
  height: 32px;
  justify-content: center;
`;

const iconStyle = css`
  color: #ffffff;
`;

const SquareIcon = ({ Icon = null, bgColor = "initial" }) => {
  return <div className={iconWrapper} style={{ backgroundColor: bgColor }}>
    <Icon className={iconStyle} />
  </div>
}

export default SquareIcon;