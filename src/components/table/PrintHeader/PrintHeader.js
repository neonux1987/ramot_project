import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';

const _container = css`
  margin-bottom: 10px;
  font-family: 'Assistant';
  display: none;
  background: yellow;
`;

const _title = css`
font-family: 'Assistant';
`;

const _date = css`
  font-size: 16px;
`;

const PrintHeader = props => {
  const {
    pageTitle,
    date
  } = props;

  return <div className={_container} id="printHeader">
    <div>
      <Typography className={_title} variant="h5">{pageTitle}</Typography>
    </div>

    <div className={_date}>{date}</div>
  </div>;
}

export default PrintHeader;