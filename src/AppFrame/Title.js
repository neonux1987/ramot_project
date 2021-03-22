import React from 'react';
import { Typography } from '@material-ui/core';
import { css } from 'emotion';
import logoPng from '../assets/images/ramot group.png';

const container = css`
  padding-right: 5px;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  margin-top: 1px;
`;

const image = css`
  width:22px;
  height: 22px;
`;

const title = css`
  font-weight: 500;
  margin-right: 3px;
  font-size: 15px;
  margin-top: -2px;
`;

const Title = () => {
  return (
    <div className={container}>
      <img alt="logo" src={logoPng} className={image} />
      <Typography className={title} variant="subtitle1">
        קבוצת רמות - ניהול הוצאות והכנסות
        </Typography>
    </div>
  );
}

export default Title;