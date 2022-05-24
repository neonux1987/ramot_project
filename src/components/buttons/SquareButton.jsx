import React from 'react';
import classnames from 'classnames';
import { css } from 'emotion';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';

const _container = css`
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  margin: 0 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: initial;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  box-shadow: none;
`;

const _icon = css`
  color: #555555;
  font-size: 24px;
`;

const SquareButton = ({
  className,
  margin = "0 5px",
  Icon = null,
  onClick,
  bgColor = "none",
  iconColor = "#555555",
  disabled
}) => <ButtonWithSound
  disabled={disabled}
  className={classnames(_container, css`background:${bgColor}; margin: ${margin}`, className)}
  onClick={onClick}
>
    <Icon className={classnames(_icon, css`color:${iconColor}`)} />
  </ButtonWithSound>;

export default SquareButton;