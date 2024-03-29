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
`;

const _hover = css`
  :hover {
    margin-bottom: 8px;
    transition: margin-bottom 0.2s;
  }
`;

const SquareButton = ({
  className = "",
  margin = "0 5px",
  Icon = null,
  onClick,
  bgColor = "none",
  iconColor = "#ffffff",
  disabled,
  withHover = false
}) => {
  const buttonStyle = css`
    background: ${bgColor};
    margin: ${margin};
  `;

  return (
    <ButtonWithSound
      disabled={disabled}
      className={`${_container} ${buttonStyle} ${className} ${
        withHover ? _hover : ""
      }`}
      onClick={onClick}
    >
      <Icon color={iconColor} />
    </ButtonWithSound>
  );
};

export default SquareButton;
