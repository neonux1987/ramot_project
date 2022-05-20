import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';

const container = css`
  margin: 20px 0;
  border-bottom: 1px solid #dddddd;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
`;

const mainIcon = css`
  font-size: 36px;
  display: flex;
  align-items: center;
  color: #000000;
  padding-top: 0px;
  margin-left: 10px;
  width: 48px;
  height: 48px;
  border: 1px solid #dddddd;
  border-bottom: none;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;

const mainTitle = css`
  margin-right: 0px;
  color: #000000;
  font-weight: 400;
  font-size: 32px;
`;

const SimplePageHeader = ({ title, icon = null }) => {
  return <div className={container} id="simplePageHeader">

    {/* main container */}
    <div className={mainContainer}>
      <div className={mainIcon}>
        {icon}
      </div>

      <Typography className={mainTitle} variant="h3">{title}</Typography>
    </div>
    {/* endmain container */}

  </div>
}

export default SimplePageHeader;