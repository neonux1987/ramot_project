import React from 'react';
import { css } from 'emotion';
import { Slide } from '@material-ui/core';

const style = css`
  margin: 0px 10px 10px;
  padding: 10px 0 0;
  z-index: 3;
  position: relative;
  display: flex;
  background: #ffffff;
`;

const AddBoxContainer = props => <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={400}>
  <div className={style}>{props.children}</div>
</Slide>


export default AddBoxContainer;

