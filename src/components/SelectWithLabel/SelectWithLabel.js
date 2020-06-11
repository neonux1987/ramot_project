import React from 'react';
import { Select } from '@material-ui/core';
import SubtitleBoldTypography from "../Typographies/SubtitleBoldTypography";
import { container, selector } from './SelectWithLabel.module.css';

export default (props) => {

  const {
    label = "",
    value = "",
    onChange,
    children
  } = props;

  return (
    <div className={container}>

      <SubtitleBoldTypography>
        {label}
      </SubtitleBoldTypography>

      <Select
        className={selector}
        value={value}
        onChange={onChange}
      >
        {children}
      </Select>

    </div>
  );
}

