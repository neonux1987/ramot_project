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

export default (props) => {

  const {
    value = false,
    onChange,
  } = props;

  return (
    <div className={container}>

      <CheckBoxWithSound
        checked={value}
        onChange={onChange}
        name="check"
        color="primary"
      />

      <SubtitleBoldTypography>
        גיבוי ביציאה
          </SubtitleBoldTypography>

    </div>
  );
}

