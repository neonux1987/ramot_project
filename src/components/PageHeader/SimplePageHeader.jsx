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
  padding: 10px 5px 10px;
`;

const mainIcon = css`
  font-size: 48px;
  display: flex;
  align-items: center;
  color: #000000;
  padding-top: 0px;
  display: none;
`;

const mainTitle = css`
  margin-right: 0px;
  /* color: #6b6b6b; */
  color: #555555;
  font-weight: 500;
  font-size: 2.4rem;
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