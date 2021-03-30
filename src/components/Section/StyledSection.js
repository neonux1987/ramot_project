import React from 'react';
import { css } from 'emotion';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';

const _container = css`
  margin: 40px 20px 20px 20px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
  border-radius: 6px;
`;

const _header = css`
  height: 60px;
  display: flex;
  /* border-bottom: 1px solid #ececec; */
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
  color: #444444;
  font-size: 24px;
`;

const _titleWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 15px; */
`;

const _titleTypography = css`
  color: #555555;
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

const StyledSection = ({
  title,
  Icon,
  bgColor = "#555555",
  extraDetails = null,
  children,
  fullscreen = false
}) => {
  return <div className={classnames(_container, fullscreen ? fullscreenStyle : "")}>

    {/* header */}
    <div className={_header}>

      {/* title box */}
      <div className={_titleBox}>

        {/* icon */}
        <div className={_iconWrapper}>
          <Icon className={classnames(_icon, css`color:${bgColor}`)} />
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
    <div className={_content}>
      {children}
    </div>
    {/* end content */}

  </div>

}

export default StyledSection;