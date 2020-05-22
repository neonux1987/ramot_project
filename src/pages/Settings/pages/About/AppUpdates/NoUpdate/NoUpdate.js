import React from 'react';
import { container, subtitle } from './NoUpdate.module.css';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

const NoUpdate = () => {
  return (
    <div className={container}>
      <SubtitleBoldTypography className={subtitle}>
        אין עידכונים חדשים.
        </SubtitleBoldTypography>

    </div>
  );
}

export default NoUpdate;
