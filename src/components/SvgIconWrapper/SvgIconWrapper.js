import React from 'react';
import { css } from 'emotion';

const SvgIconWrapper = ({ Icon, size = 24, color = "inherit" }) => {

  return <Icon className={css`
    font-size: ${size}px;
    color: ${color};
  `} />;
}

export default SvgIconWrapper;