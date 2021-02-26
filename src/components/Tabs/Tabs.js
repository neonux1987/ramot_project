import React from 'react';
import { Tabs as MuTabs } from '@material-ui/core';
import { css } from 'emotion';

const container = css`
  flex-grow: 1;
`;

const indicator = css`
  backgroundColor: rgba(0, 0, 0, 0.04)
`;

const Tabs = props => {
  return <MuTabs
    classes={{ root: container, indicator }}
    TabIndicatorProps={{ style: { background: "none" } }}
    {...props}
  >
    {props.children}
  </MuTabs>
}

export default Tabs;