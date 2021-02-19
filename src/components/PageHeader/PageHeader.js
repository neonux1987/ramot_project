import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { BsBuilding } from 'react-icons/bs';
import { MdAssignmentTurnedIn } from 'react-icons/md';

const container = css`
  margin: 0px 25px 40px;
  padding: 10px 15px;
  font-weight: 500;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(53, 64, 82, 0.05) 0px 0px 14px 0px;
`;

const flexContainer = css`
  display: flex;
  align-items: center;
`;

const mainIcon = css`
  font-size: 36px;
  display: flex;
  align-items: center;
  color: #42474a;
  display: none;
`;

const mainTitle = css`
  margin-right: 0px;
  color: #42474a;
  font-weight: 500;
  font-size: 2.8rem;
`;

const subIcon = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #42474a;
`;

const subTitle = css`
  margin-right: 6px;
  color: #42474a;
  font-weight: 500;
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