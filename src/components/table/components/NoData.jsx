import React from 'react'
import { css } from 'emotion';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';

const style = css`
  font-size: 16px;
  font-weight: 500;
`;

const NoData = ({ text = "לא נבחר תאריך" }) => {
  return <AlignCenterMiddle>
    <span className={style}>{text}</span>
  </AlignCenterMiddle>;
}

export default NoData;