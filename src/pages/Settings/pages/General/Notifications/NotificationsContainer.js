// LIBRARIES
import React, { useState } from 'react';
import { Notifications } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import NotificationsAlerts from './NotificationsAlerts/NotificationsAlerts';
import SaveButton from '../../../../../components/SaveButton/SaveButton';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../../redux/actions/settingsActions';
import { setDirty } from '../../../../../redux/actions/goodByeActions';

// TOASTS
import { toastManager } from '../../../../../toasts/ToastManager';
import { Typography } from '@material-ui/core';

const SETTINGS_NAME = "notifications";

export default () => {
  const dispatch = useDispatch();

  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const {
    enabled
  } = data;

  const onNotificationsCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      enabled: checked
    });
    dispatch(setDirty());
  }

  const save = (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));

    toastManager.reload();

    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  }

  return (
    <StyledExpandableSection
      title={"התראות"}
      TitleIcon={Notifications}
      iconColor={"#0365a2"}
      extraDetails={() => <SaveButton onClick={save}>שמור</SaveButton>}
      padding={"30px 20px"}
    >

      <NotificationsAlerts
        enabled={enabled}
        onNotificationsCheck={onNotificationsCheck}
        description="כל ההתראות הקופצות יבוטלו למעט התראות של שגיאות"
      />

    </StyledExpandableSection >
  );
}