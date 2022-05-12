import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import { MdChevronLeft } from 'react-icons/md';

const subTitleContainer = css`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const subIconWrapper = css`
  display: flex;
  align-items: center;
  width: 28px;
  height: 28px;
  justify-content: center;
`;

const subIcon = css`
  font-size: 24px;
  color: #555555;
`;

const subTitle = css`
  color: #555555;
  font-weight: 400;
  margin-right: 5px;
`;

const Subtitle = ({ page }) => {

  return <div className={subTitleContainer}>
    <div className={subIconWrapper}>
      <MdChevronLeft className={subIcon} />
    </div>

    <Typography className={subTitle} variant="subtitle1">{page}</Typography>
  </div>
}

export default Subtitle;