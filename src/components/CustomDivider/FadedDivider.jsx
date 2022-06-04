import React from 'react';
import { Divider } from '@material-ui/core';
import { css } from 'emotion';

const style = css`
  flex-shrink: 0;
  border-top: 0px solid rgba(0, 0, 0, 0.12);
  border-right: 0px solid rgba(0, 0, 0, 0.12);
  border-left: 0px solid rgba(0, 0, 0, 0.12);
  background-color: transparent;
  height: 1px;
  border-bottom: none;
  opacity: 0.25;
  background-image: linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.5), rgba(52, 71, 103, 0)) !important;
`

const FadedDivider = () => <Divider className={style} />;

export default FadedDivider;