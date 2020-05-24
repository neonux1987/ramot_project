// LIBRARIES
import React, { useState, memo, useEffect, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SystemUpdateAlt } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import NewUpdate from './NewUpdate/NewUpdate';
import NoUpdate from './NoUpdate/NoUpdate';

// SERVICES
import { checkForUpdates, downloadUpdate } from '../../../../services/updates.svc';
import CheckingUpdates from './CheckingUpdates/CheckingUpdates';
import { updateSettings, saveSettings } from '../../../../redux/actions/settingsActions';

// ELECTRON
const { ipcRenderer, remote } = require('electron');
const appVersion = require("electron").remote.app.getVersion();

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


  const handleUpdate = useCallback(async (data) => {

    if (data) {
      const { version, releaseDate } = data;

      // dont override settings if it's the same version
      if (availableUpdate === false && version !== updateVersion) {

        dispatch(updateSettings("appUpdates", { availableUpdate: true, updateVersion: version, releaseDate }));

        const promise = await dispatch(saveSettings(false));

        if (promise === undefined)
          dispatch(updateSettings("appUpdates", { availableUpdate: false, updateVersion: "" }));

      }

    } else {
      dispatch(updateSettings("appUpdates", {
        availableUpdate: false,
        updateVersion: "",
        releaseDate: "",
        updateDownloaded: false
      }));
    }

  }, [dispatch]);

  useEffect(() => {
    let isCancelled = false;

    dispatch(checkForUpdates()).then(({ data }) => {

      handleUpdate(data);

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
  }, [dispatch, handleUpdate]);

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
        TitleIcon={SystemUpdateAlt}
        padding={"30px 20px"}
        iconColor={"#0365a2"}
      >

        {content}

      </StyledExpandableSection >
    </Fragment>
  );
}

export default memo(AppUpdates);