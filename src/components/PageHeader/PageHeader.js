import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { RiBuilding2Fill } from 'react-icons/ri';
import { MdAssignmentTurnedIn } from 'react-icons/md';

const container = css`
  margin: 20px 25px 20px;
  /* padding: 10px 15px; */
  font-weight: 500;
  /* border: 1px solid #e0e0e0; */
  /* background: #fff; */
 /*  border-radius: 8px; */
  /* box-shadow: rgba(53, 64, 82, 0.05) 0px 0px 14px 0px; */
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0;
`;

const mainIcon = css`
  font-size: 48px;
  display: flex;
  align-items: center;
  color: #c1c1c1;
  padding-top: 0px;
  display: none;
`;

const mainTitle = css`
  margin-right: 0px;
  /* color: #6b6b6b; */
  color: #0066a2;
  font-weight: 400;
`;

const subContainer = css`
  display: flex;
  align-items: center;
  /* border-top: 1px solid #efecec; */
  border-bottom: 1px solid #efecec;
  padding-right: 5px;
  /* background: #fdfdfd; */
`;

const subIcon = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #444444;
`;

const subTitle = css`
  margin-right: 6px;
  color: #444444;
  font-weight: 400;
`;

const PageHeader = ({ building, page }) => {

  return <div className={container}>

    <div className={mainContainer}>
      <div className={mainIcon}>
        <RiBuilding2Fill />
      </div>

      <Typography className={mainTitle} variant="h3">{building}</Typography>
    </div>

    <div className={subContainer}>
      <div className={subIcon}>
        <MdAssignmentTurnedIn />
      </div>

      <Typography className={subTitle} variant="subtitle1">{page}</Typography>
    </div>

  </div>
}

export default PageHeader;