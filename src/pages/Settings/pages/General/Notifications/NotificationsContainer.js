// LIBRARIES
import React, { useState } from 'react';
import { Backup } from '@material-ui/icons';
import GoodBye from 'react-goodbye';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import Sound from './Sound/Sound';
import NotificationsAlerts from './NotificationsAlerts/NotificationsAlerts';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import LeaveWithoutSavingModal from '../../../../../components/modals/LeaveWithoutSavingModal/LeaveWithoutSavingModal';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../../redux/actions/settingsActions';

const SETTINGS_NAME = "notifications";

export default () => {
  const dispatch = useDispatch();

  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const [dirty, setDirty] = useState(false);

  const {
    soundEnabled,
    notificationsEnabled
  } = data;

  const onSoundCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      soundEnabled: checked
    });
    setDirty(true);
  }

  const onNotificationsCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      notificationsEnabled: checked
    });
    setDirty(true);
  }

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy))
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      setDirty(false);
    });
  }

  return (
    <StyledExpandableSection
      title={"התראות"}
      TitleIcon={Backup}
      iconColor={"#0365a2"}
      extraDetails={() => <SaveButton onClick={save}>שמור</SaveButton>}
      padding={"30px 20px"}
    >

      <Sound soundEnabled={soundEnabled} onSoundCheck={onSoundCheck} />

      <NotificationsAlerts notificationsEnabled={notificationsEnabled} onNotificationsCheck={onNotificationsCheck} />

      <GoodBye when={dirty}>
        {({ isShow, handleOk, handleCancel }) =>
          isShow && (
            <LeaveWithoutSavingModal onAgreeHandler={handleOk} onCancelHandler={handleCancel} />
          )
        }
      </GoodBye>

    </StyledExpandableSection >
  );
}