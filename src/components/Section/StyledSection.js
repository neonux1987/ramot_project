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
  border-bottom: 1px solid #ececec;
`;

const _titleBox = css`
  margin: -20px 15px 20px 0px;
  border-radius: 3px;
  height: 65px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 62px;
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
  margin-right: 15px;
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
  padding-left: 25px;
`;

const _content = css`
  margin: 0 15px 15px;
  overflow: auto;
  position: relative;
`;

const StyledSection = ({
  title,
  Icon,
  bgColor = "rgb(111 80 206)",
  //extraDetails = null,
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

      </div>
      {/* end title box */}

      {/* title */}
      <div role="title" className={_titleWrapper}>
        <Typography className={_titleTypography} variant="h6">{title}</Typography>
      </div>
      {/* end title */}

      {/* extra details */}
      <div role="extra details" className={_extraDetails}>
        {/* {extraDetails} */}
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