// LIBRARIES
import React from 'react';
import { container, subtitle, label, currentInfo, } from './CurrentVersion.module.css';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

const CurrentVersion = ({ currentVersion }) => {

  return (
    <div className={container}>
      <SubtitleBoldTypography className={subtitle}>
        אודות התוכנה הנוכחית:
        </SubtitleBoldTypography>

      <div className={currentInfo}>
        <span className={label}>גירסה:</span>
        <span>{currentVersion}</span>
      </div>

    </div>
  );
}

export default CurrentVersion;
