// LIBRARIES
import React, { useState, memo, useEffect, Fragment } from 'react';
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

    // wrap with an if statement to check if
    // still downloading, is is then don't call to check again

    dispatch(checkForUpdates()).then(() => {
      if (!isCancelled)
        setIsChecking(false)
    });

    ipcRenderer.on("download_progress", (event, progress) => {
      setIsDownloading(true);

      let percent = Number.parseInt(progress.percent);

      if (!isCancelled) {
        setProgress(progress);
      }

      if (percent === 100) {
        setIsDownloading(false);
        ipcRenderer.removeAllListeners("download_progress");
        dispatch(updateSettings(SETTINGS_NAME, { updateDownloaded: true }));
        dispatch(saveSettings(false));
      }

    });

    return () => isCancelled = true;
  }, [dispatch, isDownloading]);

  const downloadHandler = async () => {
    setIsDownloading(true);
    /* let percent = 0;
    const myTimer = () => {
      percent += 1;
      setProgress({ percent });
    }
    console.log(percent);
    const interval = setInterval(myTimer, 1000);

    if (percent === 50) {
      console.log("yes");
      clearInterval(interval, 1000)
    } */

    const promise = await dispatch(downloadUpdate());

    if (promise === undefined)
      setIsDownloading(false);
  }

  const installHandler = () => {
    console.log("installing");
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