import React from 'react';
import { css } from 'emotion';
import DefaultButton from './DefaultButton';

const ModalButton = (props) => {
  return <DefaultButton {...props} className={css`font-size: 16px; transition: none;`} />
}

export default ModalButton;