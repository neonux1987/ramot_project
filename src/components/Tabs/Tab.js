import React from 'react';
import { Tab as MuTab } from '@material-ui/core';
import { css } from 'emotion';
import classnames from 'classnames';

// COMPONENTS
import ButtonNavLinkWithSound from '../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound';

const style = css`
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`;

const Tab = props => {
  const { className, active, ...newProps } = props;
  return <MuTab
    component={ButtonNavLinkWithSound}
    className={classnames(style, active ? "activeButton2" : "")}
    {...newProps}
  />

}

export default Tab;