import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';
import useIcons from '../../customHooks/useIcons';

const subTitleContainer = css`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-right: 5px;
`;

const subIconWrapper = css`
  display: flex;
  align-items: center;
`;

const subIcon = css`
  font-size: 16px;
  color: #555555;
`;

const subTitle = css`
  margin-right: 6px;
  color: #555555;
  font-weight: 400;
`;

const Subtitle = ({ page }) => {

  const [generateIcon] = useIcons();

  const Icon = generateIcon(page);

  return <div className={subTitleContainer}>
    <div className={subIconWrapper}>
      <Icon className={subIcon} />
    </div>

    <Typography className={subTitle} variant="subtitle1">{page}</Typography>
  </div>
}

export default Subtitle;