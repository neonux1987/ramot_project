// LIBRARIES
import React, { useState, memo, useEffect, Fragment, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SystemUpdateAlt } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import NewUpdate from './NewUpdate/NewUpdate';
import NoUpdate from './NoUpdate/NoUpdate';

// SERVICES
import { checkForUpdates, downloadUpdate, abortDownload } from '../../../../services/updates.svc';
import CheckingUpdates from './CheckingUpdates/CheckingUpdates';
import { updateSettings, saveSettings } from '../../../../redux/actions/settingsActions';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';

// ELECTRON
const { ipcRenderer } = require('electron');

const SETTINGS_NAME = "appUpdates";

const AppUpdates = () => {

  const isCancelled = useRef(false);

  const dispatch = useDispatch();

  const [isChecking, setIsChecking] = useState(true);

  const [isDownloading, setIsDownloading] = useState(false);

  const [progress, setProgress] = useState(progressState());

  const appUpdatesSettings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const {
    availableUpdate,
    updateVersion,
    releaseDate,
    updateDownloaded
  } = appUpdatesSettings;

  useEffect(() => {

    // wrap with an if statement to check if
    // still downloading, is is then don't call to check again

    dispatch(checkForUpdates()).then(() => {
      if (!isCancelled.current)
        setIsChecking(false)
    });

    ipcRenderer.on("download_progress", (event, progress) => {
      if (!isCancelled.current) setIsDownloading(true);

      let percent = Number.parseInt(progress.percent);

      if (!isCancelled.current) setProgress(progress);

      if (percent === 100) {

        if (!isCancelled.current) setIsDownloading(false);

        ipcRenderer.removeAllListeners("download_progress");
        dispatch(updateSettings(SETTINGS_NAME, { updateDownloaded: true }));
        dispatch(saveSettings(false));
      }

    });

    ipcRenderer.on("update_downloaded", (event) => {
      if (!isCancelled.current) {
        setIsDownloading(false);
        dispatch(updateSettings({ updateDownloaded: true }));
        ipcRenderer.removeAllListeners("update_downloaded");
        console.log("already downloaded");
      }
    });

  }, [dispatch, isDownloading]);

  useEffect(() => {
    return () => isCancelled.current = true;
  }, []);

  const downloadHandler = async () => {
    if (!isCancelled.current) setIsDownloading(true);

    const promise = await dispatch(downloadUpdate());

    if (promise === undefined)
      if (!isCancelled.current) setIsDownloading(false);
  }

  const installHandler = () => {
    console.log("installing");
  }

  // abort download handler
  const abortDownloadHandler = async (silent) => {
    if (!isCancelled.current) setIsDownloading(false);
    if (!isCancelled.current) setProgress(progressState());
    await abortDownload(silent);
  };

  // refresh handler
  const refreshHandler = async (event) => {
    event.stopPropagation();

    if (!isCancelled.current) setIsChecking(true);
    if (!isCancelled.current) setIsDownloading(false);
    if (!isCancelled.current) setProgress(progressState());

    await abortDownloadHandler(false);

    const promise = await dispatch(checkForUpdates());

    if (promise)
      if (!isCancelled.current) setIsChecking(false);
  };

  // delete update handler
  const deleteUpdateHandler = async (event) => {
    event.stopPropagation();

    await dispatch(updateSettings(SETTINGS_NAME, { updateDownloaded: false }));
    await dispatch(saveSettings(false));

    const promise = await dispatch(checkForUpdates());

    if (promise)
      if (!isCancelled.current) setIsChecking(false);
  };

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
          abortDownloadHandler={abortDownloadHandler}
          deleteUpdateHandler={deleteUpdateHandler}
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
        TitleIcon={SystemUpdateAlt}
        padding={"30px 20px"}
        iconColor={"#0365a2"}
        extraDetails={() => <PrimaryButton onClick={refreshHandler}>רענן</PrimaryButton>}
      >

        {content}

      </StyledExpandableSection >
    </Fragment>
  );
}

export default memo(AppUpdates);

function progressState() {
  return {
    percent: 0,
    total: 0,
    transferred: 0,
    bytesPerSecond: 0
  };
}