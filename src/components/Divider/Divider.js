// LIBRARIES
import React from 'react';
import { css } from 'emotion';
import { Divider as Dvdr } from '@material-ui/core';

const Divider = ({ margin = "20px 0" }) => {
  const root = css`
  margin: ${margin};
  background-color: rgba(0, 0, 0, 0.08);
  `;

  return <Dvdr className={root} />;
}

export default Divider;