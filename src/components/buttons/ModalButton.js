import React from 'react';
import { css } from 'emotion';
import DefaultButton from './DefaultButton';

const style = css`
  font-size: 16px;
  transition: none;
`;

const ModalButton = (props) => {
  return <DefaultButton {...props} className={style} />
}

export default ModalButton;