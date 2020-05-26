// LIBRARIES
import React, { useState, memo, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SystemUpdateAlt } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import NewUpdate from './NewUpdate/NewUpdate';
import NoUpdate from './NoUpdate/NoUpdate';

// SERVICES
import { checkForUpdates, downloadUpdate, abortDownload, deleteUpdate } from '../../../../services/updates.svc';
import CheckingUpdates from './CheckingUpdates/CheckingUpdates';
import { updateSettings, saveSettings } from '../../../../redux/actions/settingsActions';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import { myToaster } from '../../../../Toasts/toastManager';

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
    updateDownloaded,
    updateFilePath
  } = appUpdatesSettings;
  console.log("appUpdatesSettings", appUpdatesSettings);
  console.log("isDownloading", isDownloading);
  useEffect(() => {
    dispatch(checkForUpdates());
    console.log("checking effect");
  }, [dispatch]);

  useEffect(() => {

    // download progress
    ipcRenderer.on("download_progress", async (event, progress) => {
      if (!isCancelled.current) {
        //setIsDownloading(true);
        setProgress(progress);
      }
    });

    ipcRenderer.on("update_available", async (event, result) => {
      const { version, releaseDate } = result.data;

      if (!isCancelled.current) setIsChecking(false);

      if (!updateDownloaded || version !== updateVersion) {
        await dispatch(updateSettings(SETTINGS_NAME, {
          availableUpdate: true,
          updateVersion: version,
          releaseDate,
          updateDownloaded: false,
          userNotified: true
        }));
        await dispatch(saveSettings(false));
      }

      ipcRenderer.removeAllListeners('update_available');
    });

    ipcRenderer.on("update_not_available", async (event) => {
      if (!isCancelled.current) setIsChecking(false);
      console.log("not available")
      await dispatch(updateSettings(SETTINGS_NAME, {
        availableUpdate: false,
        updateVersion: "",
        releaseDate: "",
        updateDownloaded: false,
        userNotified: false
      }));
      await dispatch(saveSettings(false));

      ipcRenderer.removeAllListeners('update_not_available');
    });

    ipcRenderer.on("downloading_update", (event, result) => {
      const { error } = result;

      if (error)
        myToaster.error(error.message)
      else {
        if (!isCancelled.current) setIsDownloading(true);
      }

      ipcRenderer.removeAllListeners('downloading_update');
    });

    ipcRenderer.on("update_downloaded", async (event, result) => {
      setIsDownloading(false);
      await dispatch(updateSettings({ updateDownloaded: true, updateFilePath: result.downloadedFile }));
      await dispatch(saveSettings(false));
      ipcRenderer.removeAllListeners('update_downloaded');
    });

    ipcRenderer.on("updater_error", async (event, result) => {
      ipcRenderer.removeAllListeners('updater_error');
      myToaster.error(result.error);
    });

  }, [dispatch, updateDownloaded, updateVersion]);

  // cleanup
  useEffect(() => {
    return () => {
      isCancelled.current = true;
      ipcRenderer.removeAllListeners("download_progress");
      ipcRenderer.removeAllListeners("update_available");
      ipcRenderer.removeAllListeners("update_not_available");
      ipcRenderer.removeAllListeners("downloading_update");
      ipcRenderer.removeAllListeners("update_downloaded");
      ipcRenderer.removeAllListeners("updater_error");
    }
  }, []);

  const downloadHandler = async () => {
    if (!isDownloading && !updateDownloaded) {
      if (!isCancelled.current) setIsDownloading(true);

      const promise = await dispatch(downloadUpdate());

      if (promise === undefined)
        if (!isCancelled.current) setIsDownloading(false);
    }
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
    await dispatch(checkForUpdates());
  };

  // delete update handler
  const deleteUpdateHandler = async (event) => {
    event.stopPropagation();

    var index = updateFilePath.indexOf("\\update.exe");

    var newPath = updateFilePath.substr(0, index);

    const promise = await deleteUpdate(newPath);

    if (promise) {
      console.log("promise");
      await dispatch(updateSettings(SETTINGS_NAME, {
        availableUpdate: false,
        updateVersion: "",
        releaseDate: "",
        userNotified: false,
        updateDownloaded: false,
        updateFilePath: ""
      }));
      await dispatch(saveSettings(false));
    }
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