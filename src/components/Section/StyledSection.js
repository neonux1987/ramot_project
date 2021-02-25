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
`;

const _titleBox = css`
  margin: -20px 20px 20px 20px;
  border-radius: 6px;
  padding: 0 40px;
  height: 80px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
`;

const _iconWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _icon = css`
  color: #ffffff;
`;

const _titleWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

const _titleTypography = css`
  color: #ffffff;
  font-weight: 400;
`;

const _extraDetails = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-left: 25px;
`;

const _content = css`
  margin: 20px;
`;

const StyledSection = ({
  title,
  Icon,
  bgColor = "rgb(17 162 199)",
  extraDetails = null,
  children
}) => {
  return <div className={_container}>

    {/* header */}
    <div role="header" className={_header}>

      {/* title box */}
      <div role="title box" className={classnames(_titleBox, css`background-Color: ${bgColor}`)}>

        {/* icon */}
        <div role="icon" className={_iconWrapper}>
          <Icon className={_icon} />
        </div>
        {/* end icon */}

        {/* title */}
        <div role="title" className={_titleWrapper}>
          <Typography className={_titleTypography} variant="h6">{title}</Typography>
        </div>
        {/* end title */}

      </div>
      {/* end title box */}

      {/* extra details */}
      <div role="extra details" className={_extraDetails}>
        {extraDetails}
      </div>
      {/* end extra details */}

    </div>
    {/* end header */}

    {/* content */}
    <div role="content" className={_content}>
      {children}
    </div>
    {/* end content */}

  </div>

}

export default StyledSection;