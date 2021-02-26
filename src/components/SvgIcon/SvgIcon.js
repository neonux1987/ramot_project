import React from 'react';
import { css } from 'emotion';

const SvgIcon = props => {
  const { Icon = null, color = "#000000", ...newProps } = props;
  return <Icon
    className={css`
  font-size: 24px;
  font-color: ${color}
`} {...newProps} />;
}

export default SvgIcon;