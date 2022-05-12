// LIBRARIES
import React from 'react';
import { css } from 'emotion';
import { Divider as Dvdr } from '@material-ui/core';

const Divider = ({ margin = "20px 0", orientation = "horizontal", flexItem = false }) => {
  const root = css`
  margin: ${margin};
  background-color: #f1f1f1;
  `;

  return <Dvdr className={root} orientation={orientation} flexItem={flexItem} />;
}

export default Divider;