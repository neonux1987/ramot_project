import React from 'react';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';
import { css } from 'emotion';

const style = css`
  margin: 0 8px;
  background-color: #f9f9f9;
  border: 1px solid #dedede;
  color: #555555;
  box-shadow: none;
  font-weight: 600;
  font-size: 13px;

  :hover{
    box-shadow: none;
    background: #f1f1f1;
  }
`;

const WhiteButton = ({ onClick, children, margin = "0 8px;", ...otherProps }) => {
  const marginStyle = css`margin:${margin}`;
  return <ButtonWithSound onClick={onClick} variant="contained" color="primary" className={`${style} ${marginStyle}`} {...otherProps}>
    {children}
  </ButtonWithSound>
}

export default WhiteButton;