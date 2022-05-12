import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';

const _container = css`
  display: none;
`;

const _title = css`
  font-family: sans-serif;
  font-size: 24pt;
`;

const _date = css`
  font-size: 16pt;
  font-family: sans-serif;
`;

const PrintHeader = ({ printHeaderDetails = {
  pageTitle: "",
  date: ""
} }) => {

  const {
    pageTitle,
    date
  } = printHeaderDetails;

  return <div className={_container} id="printHeader">
    <div>
      <Typography className={_title} variant="h5">{pageTitle}</Typography>
    </div>

    <div>
      <Typography className={_date} variant="h6">{date}</Typography>
    </div>
  </div>;
}

export default PrintHeader;