import React from 'react';
import { css } from 'emotion';
import classnames from 'classnames';

const ColorPreviewBox = ({ color, className = "", ...otherProps }) => {

  const style = css`
  width: 32px;
  height: 32px;
  background-color: ${color}
  `;

  return <div
    className={classnames(style, className)}
    {...otherProps}
  >
  </div>;

}

export default ColorPreviewBox;