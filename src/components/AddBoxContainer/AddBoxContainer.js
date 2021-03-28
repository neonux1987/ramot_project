import React from 'react';
import { css } from 'emotion';
import { Slide } from '@material-ui/core';

const style = css`
  margin: 0px 10px 10px;
  padding: 10px 0 0;
  z-index: 3;
  position: relative;
  display: flex;
  border: 1px solid #ececec;
  border-radius: 3px;
  background: #fafafa;
`;

const AddBoxContainer = props => <Slide direction="down" in={true} mountOnEnter unmountOnExit timeout={300}>
  <div className={style}>{props.children}</div>
</Slide>


export default AddBoxContainer;

