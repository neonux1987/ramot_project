import React from 'react';
import { css } from 'emotion';

const SvgIconWrapper = ({ Icon, size = 32, color = "inherit" }) => {

  return <Icon className={css`
    font-size: ${size}px;
    color: ${color};
    /* filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 0px 5px); */
  `} />;
}

export default SvgIconWrapper;