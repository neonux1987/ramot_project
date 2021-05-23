import React from 'react';
import { css } from 'emotion';
import { Collapse } from '@material-ui/core';

const style = css`
  margin: 0px;
  padding: 10px 0 0;
  z-index: 8;
  position: relative;
  display: flex;
  background: #ffffff;
`;

const AddBoxContainer = props => <Collapse in={props.show} mountOnEnter unmountOnExit timeout={400} className="addBoxContainer">
  <div className={style}>{props.show ? props.children : null}</div>
</Collapse>


export default AddBoxContainer;

