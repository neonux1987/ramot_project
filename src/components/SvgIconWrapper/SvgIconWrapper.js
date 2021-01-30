import React from 'react';
import { css } from 'emotion';

const SvgIconWrapper = ({ Icon, size = 32, color = "#000000" }) => {

  return <Icon className={css`
    font-size: ${size}px;
    color: ${color}
  `} />;
}

export default SvgIconWrapper;