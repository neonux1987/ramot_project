// LIBRARIES
import React, { Fragment } from 'react';
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
  bar1Determinate,
  colorPrimary,
  downloadDetails,
  downloadTransferred,
  downloadSpeed,
  downloadTitle,
  ltr,
  downloadedDetail,
  transferredDetail
} from './NewUpdate.module.css';

// COMPONENTS
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton';
import SubtitleBoldTypography from '../../../../../components/Typographies/SubtitleBoldTypography';
import { formatBytes } from '../../../../../helpers/utils';

const NewUpdate = ({ updateVersion, releaseDate, updateDownloaded, downloadHandler, installHandler, isDownloading, progress }) => {
  const date = new Date(releaseDate);

  const renderNewVersionAvailable = !updateDownloaded && !isDownloading ? <NewVersionAvailable updateVersion={updateVersion} date={date} /> : null;

  const renderDownload = updateDownloaded === false && !isDownloading ? <Download downloadHandler={downloadHandler} /> : null;

  const renderInstall = updateDownloaded && !isDownloading ? <Install installHandler={installHandler} updateVersion={updateVersion} date={date} /> : null;

  const renderDownloading = updateDownloaded === false && isDownloading ? <DownloadProgress progress={progress} updateVersion={updateVersion} /> : null;

  return (
    <div className={container}>
      {renderNewVersionAvailable}

      {renderDownload}

      {renderInstall}

      {renderDownloading}

      {/* <DownloadProgress progressValue={progressValue} /> */}

    </div>
  );
}

export default NewUpdate;

const NewVersionAvailable = ({ updateVersion, date }) => {
  return <Fragment>
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
  </Fragment>;
}

const Download = ({ downloadHandler }) => {
  return (
    <div>
      <span>להורדת העידכון לחץ</span>
      <PrimaryButton className={downloadButton} onClick={downloadHandler}>הורד</PrimaryButton>
    </div>
  );
}

const Install = ({ installHandler, updateVersion, date }) => {
  return (
    <div>
      <SubtitleBoldTypography className={subtitle}>
        {`המערכת סיימה להוריד את העידכון`}
      </SubtitleBoldTypography>

      <div className={releaseInfo}>
        <span className={label}>גירסה:</span>
        <span>{updateVersion}</span>
        <br />
        <span className={label}>תאריך יציאה:</span>
        <span>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</span>
      </div>

      <span>להתקנה לחץ</span>
      <span></span>
      <PrimaryButton className={installButton} onClick={installHandler}>התקן</PrimaryButton>
    </div>
  );
}

const DownloadProgress = ({ progress, updateVersion }) => {
  const {
    percent,
    total,
    transferred,
    bytesPerSecond
  } = progress;

  return (
    <div className={downloadProgressWrapper}>

      <div className={downloadTitle}>
        <span className={label}>{`מוריד עידכון גירסה ${updateVersion}...`}</span>
      </div>

      <ProgressBar progressValue={percent} />

      <div className={downloadDetails}>

        <div className={downloadSpeed}>
          <span className={label}>קצב הורדה:</span>
          <span className={ltr}>{`${formatBytes(bytesPerSecond, 2)}/S`}</span>
        </div>

        <div className={downloadTransferred}>
          <div className={downloadedDetail}>
            <span className={label}>ירדו</span>
            <span className={ltr}>{`${formatBytes(transferred, 2)}`}</span>
          </div>

          <div className={transferredDetail}>
            <span className={label}>מתוך</span>
            <span className={ltr}>{`${formatBytes(total, 2)}`}</span>
          </div>
        </div>

      </div>


    </div>
  );
}

const ProgressBar = ({ progressValue }) => {
  const parsedValue = Number.parseInt(progressValue);
  return (
    <div className={progressBarWrapper}>

      <div>100%</div>

      <div className={progressBarInner}>
        <LinearProgress classes={{
          colorPrimary,
          bar1Determinate
        }} variant="determinate" value={parsedValue} />
      </div>

      <div>0%</div>

    </div>
  );
}