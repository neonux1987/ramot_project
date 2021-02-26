import React from 'react';
import { AppBar as MuAppBar } from '@material-ui/core';
import { css } from 'emotion';

const container = css`
  width: initial;
  box-shadow: none;
  background: none;
  border-bottom: 1px solid #e3e5ec;
  margin: 20px 20px 30px 20px;
`;

const AppBar = props => {
  return <MuAppBar classes={{ root: container }} position="static" >
    {props.children}
  </MuAppBar>
}

export default AppBar;