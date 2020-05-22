// LIBRARIES
import React, { useState, memo, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, MenuItem } from '@material-ui/core';
import { Backup } from '@material-ui/icons';
import GoodBye from 'react-goodbye';

// CSS
import styles from './AppUpdates.module.css';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import { checkForUpdates } from '../../../../services/updates.svc';

// TOASTS
import { myToaster } from '../../../../Toasts/toastManager';

//ELECTRON
const appCurrentVersion = require("electron").remote.app.getVersion();

const SETTINGS_NAME = "appUpdates";

const AppUpdates = () => {

  const dispatch = useDispatch();

  const appUpdatesSettings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const { availableUpdate, updateVersion } = appUpdatesSettings;

  useEffect(() => {
    dispatch(checkForUpdates());
  }, [dispatch]);

  const newVersionContent = !availableUpdate ? <div>בודק אם קיים עדכון...</div> : <div>
    <span>גירסה חדשה יותר זמינה עכשיו להורדה</span>
    <span> {`מס' גירסה ${updateVersion}`} </span>
  </div>

  return (
    <StyledExpandableSection
      title={"עדכוני תוכנה"}
      TitleIcon={Backup}
      padding={"30px 20px"}
      iconColor={"#0365a2"}
    >

      {newVersionContent}

      <div>
        <span>גירסה נוכחית</span>
        <span>{appCurrentVersion}</span>
      </div>

    </StyledExpandableSection >
  );
}

export default memo(AppUpdates);