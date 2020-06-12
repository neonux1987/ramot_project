// LIBRARIES
import React from 'react';
import { css } from 'emotion';
import { Divider } from '@material-ui/core';

export default ({ margin = "40px 0" }) => {
  const root = css`
  margin: ${margin};
  background-color: rgba(0, 0, 0, 0.08);
  `;

  return <Divider className={root} />;
}