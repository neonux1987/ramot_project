import React from "react";
import { css } from "emotion";
import ButtonWithSound from "../../componentsWithSound/ButtonWithSound/ButtonWithSound";

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
  box-shadow: none;

  :hover {
    margin-bottom: 8px;
    transition: margin-bottom 0.2s;
  }
`;

const _icon = css`
  color: #ffffff;
  font-size: 24px;
`;

const SquareButton = ({
  className = "",
  margin = "0 5px",
  Icon = null,
  onClick,
  bgColor = "none",
  iconColor = "#ffffff",
  disabled
}) => {
  const buttonStyle = css`
    background: ${bgColor};
    margin: ${margin};
  `;
  const iconStyle = css`
    color: ${iconColor};
  `;
  return (
    <ButtonWithSound
      disabled={disabled}
      className={`${_container} ${buttonStyle} ${className}`}
      onClick={onClick}
    >
      <Icon className={`${_icon} ${iconStyle}`} />
    </ButtonWithSound>
  );
};

export default SquareButton;
