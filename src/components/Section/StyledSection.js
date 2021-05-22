import React from 'react';
import { css } from 'emotion';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';
import CenteredLoader from '../AnimatedLoaders/CenteredLoader';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';

const _container = css`
  margin: 30px 20px 20px 20px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(44, 101, 144, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const _header = css`
  height: 60px;
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  background: #0e7ab9;
`;

const _titleBox = css`
  /* margin: -20px 15px 20px 0px; */
  /* border-radius: 3px; */
  /* height: 65px; */
  /* box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 62px; */
  padding: 0 15px;
`;

const _iconWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _icon = css`
  color: #ffffff;
  font-size: 24px;
`;

const _titleWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 15px; */
`;

const _titleTypography = css`
  color: #ffffff;
  font-weight: 400;
  font-size: 1.3em;
`;

const _extraDetails = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

const _content = css`
  /* margin: 0 15px 15px; */
  overflow: auto;
  position: relative;
`;

const fullscreenStyle = css`
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 700;
  width: 100%;
  height: 100%;
`;

const noDataStyle = css`
  font-size: 16px;
  color: #484747;
  font-size: 18px;
  justify-content: center;
  display: flex;
  padding: 50px 0;
`;

const StyledSection = ({
  title,
  Icon,
  bgColor = "#0e7ab9",
  extraDetails = null,
  children,
  isFullscreen = false,
  loading = false,
  noData = false,
  noDataText = "אין נתונים"
}) => {
  const content = loading ? <CenteredLoader /> : children;
  const render = noData ? <AlignCenterMiddle className={noDataStyle}>{noDataText}</AlignCenterMiddle> : content;

  return <div className={classnames(_container, isFullscreen ? fullscreenStyle : "")} id="styledSection">

    {/* header */}
    <div className={classnames(_header, css`background-color:${bgColor}`)} id="styledSection-header">

      {/* title box */}
      <div className={_titleBox}>

        {/* icon */}
        <div className={_iconWrapper}>
          <Icon className={_icon} />
        </div>
        {/* end icon */}

      </div>
      {/* end title box */}

      {/* title */}
      <div className={_titleWrapper}>
        <Typography className={_titleTypography} variant="h6">{title}</Typography>
      </div>
      {/* end title */}

      {/* extra details */}
      <div className={_extraDetails}>
        {extraDetails}
      </div>
      {/* end extra details */}

    </div>
    {/* end header */}

    {/* content */}
    <div className={_content} id="styledSection-content">
      {render}
    </div>
    {/* end content */}

  </div>

}

export default StyledSection;