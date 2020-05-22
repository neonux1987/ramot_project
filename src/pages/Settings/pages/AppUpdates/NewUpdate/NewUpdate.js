// LIBRARIES
import React from 'react';
import { container, subtitle, label, releaseInfo, installButton, downloadButton } from './NewUpdate.module.css';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';

const NewUpdate = ({ updateVersion, releaseDate, updateDownloaded }) => {
  const date = new Date(releaseDate);

  const renderAction = updateDownloaded === false ? <Download /> : <Install />

  return (
    <div className={container}>
      <SubtitleBoldTypography className={subtitle}>
        גירסה חדשה יותר זמינה עכשיו להורדה
        </SubtitleBoldTypography>

      <div className={releaseInfo}>
        <span className={label}>גירסה:</span>
        <span>{updateVersion}</span>
        <br />
        <span className={label}>תאריך יציאה:</span>
        <span>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</span>
      </div>

      {renderAction}

    </div>
  );
}

export default NewUpdate;

const Download = () => {
  return (
    <div>
      <span>להורדת העידכון לחץ</span>
      <PrimaryButton className={downloadButton} onClick={() => { }}>הורד</PrimaryButton>
    </div>
  );
}

const Install = () => {
  return (
    <div>
      <span>המערכת סיימה להוריד את העידכון להתקנת העידכון לחץ</span>
      <span></span>
      <PrimaryButton className={installButton} onClick={() => { }}>התקן</PrimaryButton>
    </div>
  );
}