// LIBRARIES
import React, { useState, memo, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backup } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import NewUpdate from './NewUpdate/NewUpdate';
import NoUpdate from './NoUpdate/NoUpdate';

// SERVICES
import { checkForUpdates, downloadUpdate } from '../../../../services/updates.svc';
import CheckingUpdates from './CheckingUpdates/CheckingUpdates';

// ELECTRON
const { ipcRenderer } = require('electron');

const SETTINGS_NAME = "appUpdates";

const AppUpdates = () => {

  const dispatch = useDispatch();

  const [isChecking, setIsChecking] = useState(true);

  const [isDownloading, setIsDownloading] = useState(false);

  const [progress, setProgress] = useState({
    percent: 0,
    total: 0,
    transferred: 0,
    bytesPerSecond: 0
  });

  const appUpdatesSettings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const {
    availableUpdate,
    updateVersion,
    releaseDate,
    updateDownloaded
  } = appUpdatesSettings;

  useEffect(() => {
    let isCancelled = false;
    dispatch(checkForUpdates()).then(() => {
      if (!isCancelled)
        setIsChecking(false)
    });

    ipcRenderer.on("download_progress", (event, progress) => {
      let percent = Number.parseInt(progress.percent);

      if (!isCancelled)
        setProgress(Number.parseInt(progress));

      if (percent === 100)
        ipcRenderer.removeAllListeners("download_progress")
    });

    return () => isCancelled = true;
  }, [dispatch]);

  const downloadHandler = () => {

    dispatch(downloadUpdate()).then(() => {
      setIsDownloading(true);
      console.log("yes");
    });
  }

  const installHandler = () => {
    dispatch(downloadUpdate());
  }

  const renderNewUpdate = () => {
    return (
      !isChecking && availableUpdate ?
        <NewUpdate
          updateVersion={updateVersion}
          releaseDate={releaseDate}
          updateDownloaded={updateDownloaded}
          progress={progress}
          isDownloading={isDownloading}
          downloadHandler={downloadHandler}
          installHandler={installHandler}
        /> :
        <NoUpdate />
    )
  }

  const content = isChecking ?
    <CheckingUpdates /> :
    renderNewUpdate();

  return (
    <Fragment>
      <StyledExpandableSection
        title={"עדכוני תוכנה"}
        TitleIcon={Backup}
        padding={"30px 20px"}
        iconColor={"#0365a2"}
      >

        {content}

      </StyledExpandableSection >
    </Fragment>
  );
}

export default memo(AppUpdates);