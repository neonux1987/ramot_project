import React from 'react';
import SubtitleBoldTypography from "../Typographies/SubtitleBoldTypography";
import CheckBoxWithSound from '../../componentsWithSound/CheckBoxWithSound/CheckBoxWithSound'
import { css } from 'emotion';

const container = css`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  margin-right: -11px;
  `;

const CheckBoxWithLabel = (props) => {

  const {
    label = "",
    name = "",
    value = false,
    onChange,
  } = props;

  return (
    <div className={container}>

      <CheckBoxWithSound
        checked={value}
        onChange={onChange}
        name={name}
        color="primary"
      />

      <SubtitleBoldTypography>
        {label}
      </SubtitleBoldTypography>

    </div>
  );
}

export default CheckBoxWithLabel;