// LIBRARIES
import React, { useState } from 'react';
import { Notifications } from '@material-ui/icons';
import GoodBye from 'react-goodbye';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
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
    enabled
  } = data;

  const onNotificationsCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      enabled: checked
    });
    setDirty(true);
  }

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      setDirty(false);
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

      <NotificationsAlerts enabled={enabled} onNotificationsCheck={onNotificationsCheck} />

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