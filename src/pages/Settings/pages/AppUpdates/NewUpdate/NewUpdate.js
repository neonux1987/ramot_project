// LIBRARIES
import React from 'react';
import { LinearProgress } from '@material-ui/core';

// CSS
import {
  container,
  subtitle,
  label,
  releaseInfo,
  installButton,
  downloadButton,
  downloadProgressWrapper,
  progressBarWrapper,
  progressBarInner,
  linearProgressBack,
  linearProgressFront
} from './NewUpdate.module.css';

// COMPONENTS
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';

const NewUpdate = ({ updateVersion, releaseDate, updateDownloaded, downloadHandler, installHandler, isDownloading, progress }) => {
  const date = new Date(releaseDate);

  const renderDownload = updateDownloaded === false && !isDownloading ? <Download downloadHandler={downloadHandler} /> : null;

  const renderInstall = updateDownloaded && !isDownloading ? <Install installHandler={installHandler} /> : null;

  const renderDownloading = updateDownloaded === false && isDownloading ? <DownloadProgress progress={progress} /> : null;

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

      {renderDownload}

      {renderInstall}

      {renderDownloading}

      {/* <DownloadProgress progressValue={progressValue} /> */}

    </div>
  );
}

export default NewUpdate;

const Download = ({ downloadHandler }) => {
  return (
    <div>
      <span>להורדת העידכון לחץ</span>
      <PrimaryButton className={downloadButton} onClick={downloadHandler}>הורד</PrimaryButton>
    </div>
  );
}

const Install = ({ installHandler }) => {
  return (
    <div>
      <span>המערכת סיימה להוריד את העידכון להתקנת העידכון לחץ</span>
      <span></span>
      <PrimaryButton className={installButton} onClick={installHandler}>התקן</PrimaryButton>
    </div>
  );
}

const DownloadProgress = ({ progress }) => {
  const {
    percent,
    total,
    transferred,
    bytesPerSecond
  } = progress;
  console.log(progress);
  return (
    <div className={downloadProgressWrapper}>

      <ProgressBar progressValue={percent} />

      <span>קצב הורדה</span>
      <span>{bytesPerSecond}</span>

      <span>ירד</span>
      <span>{transferred}</span>

      <span>סה"כ</span>
      <span>{total}</span>

    </div>
  );
}

const ProgressBar = ({ progressValue }) => {
  const parsedValue = Number.parseInt(progressValue);
  return (
    <div className={progressBarWrapper}>

      <div>0%</div>

      <div className={progressBarInner}>
        <LinearProgress variant="determinate" className={linearProgressBack} value={parsedValue} />
        <LinearProgress variant="determinate" className={linearProgressFront} value={parsedValue} />
      </div>

      <div>100%</div>

    </div>
  );
}