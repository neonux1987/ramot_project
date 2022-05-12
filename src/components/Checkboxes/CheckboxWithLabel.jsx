import React from 'react';
import SubtitleBoldTypography from "../Typographies/SubtitleBoldTypography";
import CheckBoxWithSound from '../../componentsWithSound/CheckBoxWithSound/CheckBoxWithSound'
import { css } from 'emotion';
import classnames from 'classnames';

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
    disabled = false,
    mt = "0",
    mr = "-11px",
    mb = "0",
    ml = "21px",
  } = props;

  return (
    <div className={classnames(container, css`margin: ${mt} ${mr} ${mb} ${ml};`)}>

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