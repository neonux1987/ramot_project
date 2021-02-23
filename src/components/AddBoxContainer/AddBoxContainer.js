import React from 'react';
import { css } from 'emotion';

const style = css`
  margin: 0px 0 10px;
  padding: 10px 0 0;
  z-index: 3;
  position: relative;
  display: flex;
`;

const AddBoxContainer = props => (<div className={style}>{props.children}</div>)

export default AddBoxContainer;

