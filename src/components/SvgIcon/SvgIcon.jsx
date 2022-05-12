import React from 'react';
import { css } from 'emotion';

const SvgIcon = props => {
  const { size = "24px", Icon = null, color = "#000000", ...newProps } = props;
  return <Icon
    className={css`
  font-size: ${size};
  color: ${color}
`} {...newProps} />;
}

export default SvgIcon;