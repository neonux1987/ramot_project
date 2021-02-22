import React from 'react';
import { css } from 'emotion';

const style = css`
  border: 1px solid #e3eaec;
  margin: 0px 0 10px;
  padding: 10px 10px 0;
  z-index: 3;
  position: relative;
  box-shadow: rgba(0, 64, 82, 0.05) 0px 0px 14px 0px;
  border-radius: 6px;
  background-color: #ffffff;
  display: flex;
`;

const AddBoxContainer = props => (<div className={style}>{props.children}</div>)

export default AddBoxContainer;

