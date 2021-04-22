import React from 'react';
import { css } from 'emotion';
import { Collapse } from '@material-ui/core';

const style = css`
  margin: 0px;
  padding: 10px 0 0;
  z-index: 3;
  position: relative;
  display: flex;
  background: #f5f5f5;
  border: 1px solid #f1f1f1;
`;

const AddBoxContainer = props => <Collapse in={props.show} mountOnEnter unmountOnExit timeout={400}>
  <div className={style}>{props.show ? props.children : null}</div>
</Collapse>


export default AddBoxContainer;

