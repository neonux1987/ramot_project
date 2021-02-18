import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { BsBuilding } from 'react-icons/bs';
import { MdAssignmentTurnedIn } from 'react-icons/md';

const container = css`
  margin: 0px 25px 40px;
  color: #777777;
  padding: 10px 5px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
`;

const flexContainer = css`
  display: flex;
  align-items: center;
`;

const mainIcon = css`
  font-size: 36px;
  display: flex;
  align-items: center;
  color: #777777;
`;

const mainTitle = css`
  margin-right: 10px;
  color: #777777;
`;

const subIcon = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #777777;
`;

const subTitle = css`
  margin-right: 10px;
  color: #777777;
`;

const PageHeader = ({ building, page }) => {

  return <div className={container}>

    <div className={flexContainer}>
      <div className={mainIcon}>
        <BsBuilding />
      </div>

      <Typography className={mainTitle} variant="h3">{building}</Typography>
    </div>

    <div className={flexContainer}>
      <div className={subIcon}>
        <MdAssignmentTurnedIn />
      </div>

      <Typography className={subTitle} variant="subtitle1">{page}</Typography>
    </div>

  </div>
}

export default PageHeader;