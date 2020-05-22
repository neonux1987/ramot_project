// LIBRARIES
import React, { useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backup } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import NewUpdate from './NewUpdate/NewUpdate';
import NoUpdate from './NoUpdate/NoUpdate';

// SERVICES
import { checkForUpdates } from '../../../../services/updates.svc';
import CurrentVersion from './CurrentVersion/CurrentVersion';
import CheckingUpdates from './CheckingUpdates/CheckingUpdates';

//ELECTRON
const appCurrentVersion = require("electron").remote.app.getVersion();

const SETTINGS_NAME = "appUpdates";

const AppUpdates = () => {

  const dispatch = useDispatch();

  const [isChecking, setIsChecking] = useState(true);

  const appUpdatesSettings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const {
    availableUpdate,
    updateVersion,
    releaseDate,
    updateDownloaded
  } = appUpdatesSettings;

  useEffect(() => {
    dispatch(checkForUpdates()).then(() => setIsChecking(false));
  }, [dispatch]);

  const renderNewUpdate = () => {
    return (
      !isChecking && availableUpdate ?
        <NewUpdate updateVersion={updateVersion} releaseDate={releaseDate} updateDownloaded={updateDownloaded} /> :
        <NoUpdate />
    )
  }

  const content = isChecking ?
    <CheckingUpdates /> :
    renderNewUpdate();

  return (
    <StyledExpandableSection
      title={"עדכוני תוכנה"}
      TitleIcon={Backup}
      padding={"30px 20px"}
      iconColor={"#0365a2"}
    >

      {content}

      <CurrentVersion currentVersion={appCurrentVersion} />

    </StyledExpandableSection >
  );
}

export default memo(AppUpdates);