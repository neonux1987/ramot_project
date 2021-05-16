import React from 'react';
import SubtitleBoldTypography from "../Typographies/SubtitleBoldTypography";
import CheckBoxWithSound from '../../componentsWithSound/CheckBoxWithSound/CheckBoxWithSound'
import { css } from 'emotion';

const container = css`
  display: flex;
  align-items: center;
  margin-left: 21px;
  margin-right: -11px
`;

const CheckboxWithLabel = (props) => {

  const {
    label = "",
    name = "",
    checked = false,
    onChange,
    disabled = false
  } = props;

  return (
    <div className={container}>

      <CheckBoxWithSound
        checked={checked}
        onChange={onChange}
        name={name}
        color="default"
        disabled={disabled}
      />

      <SubtitleBoldTypography>
        {label}
      </SubtitleBoldTypography>

    </div>
  );
}

export default CheckboxWithLabel;