import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { RiBuilding2Fill } from 'react-icons/ri';
import useIcons from '../../customHooks/useIcons';

const container = css`
  margin: 20px 20px 30px;
`;

const mainContainer = css`
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

const mainIcon = css`
  font-size: 48px;
  display: flex;
  align-items: center;
  color: #555555;
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

const subContainer = css`
  display: flex;
  align-items: center;
  padding: 0 5px;
  border-bottom: 1px solid #ececec;
`;

const subIconWrapper = css`
  display: flex;
  align-items: center;
`;

const subIcon = css`
  font-size: 16px;
  color: #1489ce;
`;

const subTitle = css`
  margin-right: 6px;
  color: #555555;
  font-weight: 400;
`;

const PageHeader = ({ building, page }) => {

  const [generateIcon] = useIcons();

  const SubIcon = generateIcon(page);

  return <div className={container}>

    <div className={mainContainer}>
      <div className={mainIcon}>
        <RiBuilding2Fill />
      </div>

      <Typography className={mainTitle} variant="h3">{building}</Typography>
    </div>

    <div className={subContainer}>
      <div className={subIconWrapper}>
        <SubIcon className={subIcon} />
      </div>

      <Typography className={subTitle} variant="subtitle1">{page}</Typography>
    </div>

  </div>
}

export default PageHeader;