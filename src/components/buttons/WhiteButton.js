import React from 'react';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';
import { css } from 'emotion';

const style = css`
  margin: 8px;
  background-color: #fbfbfb;
  border-color: #343a40;
  border: 1px solid #dedede;
  color: #000;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(248, 248, 249) 100%);
  box-shadow: none;
  font-weight: 600;
  font-size: 13px;
`;

const WhiteButton = (props) => {
  return <ButtonWithSound onClick={props.onClick} variant="contained" color="primary" className={style}>
    {props.children}
  </ButtonWithSound>
}

export default WhiteButton;