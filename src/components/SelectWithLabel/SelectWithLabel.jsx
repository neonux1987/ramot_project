import React from 'react';
import { css } from 'emotion';
import { Select } from '@material-ui/core';
import SubtitleBoldTypography from "../Typographies/SubtitleBoldTypography";

const container = css`
display: flex;
margin-bottom: 30px;
align-items: center;
`;

const selector = css`
margin-right: 20px;
  width: 40px;
`;

const SelectWithLabel = props => {

  const {
    label = "",
    value = "",
    onChange,
    children,
    disabled = false
  } = props;

  return (
    <div className={container}>

      <SubtitleBoldTypography className={css`color: ${disabled ? "rgba(0, 0, 0, 0.38)" : "initial"}`}>
        {label}
      </SubtitleBoldTypography>

      <Select
        className={selector}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </Select>

    </div >
  );
}

export default SelectWithLabel;
