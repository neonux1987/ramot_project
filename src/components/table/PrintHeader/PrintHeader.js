import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';

const tableHeaderContainer = css`
  margin-bottom: 10px;
`;

const tableHeaderDate = css`
  font-size: 16px;
`;

const PrintHeader = props => {
  const {
    pageTitle,
    date
  } = props;

  return <div className={tableHeaderContainer}>
    <div>
      <Typography variant="h5">{pageTitle}</Typography>
    </div>

    <div className={tableHeaderDate}>{date}</div>
  </div>;
}

export default PrintHeader;