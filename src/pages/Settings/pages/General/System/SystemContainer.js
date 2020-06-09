// LIBRARIES
import React, { useState } from 'react';
import { Android } from '@material-ui/icons';
import GoodBye from 'react-goodbye';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import Sound from './Sound/Sound';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import LeaveWithoutSavingModal from '../../../../../components/modals/LeaveWithoutSavingModal/LeaveWithoutSavingModal';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../../redux/actions/settingsActions';

import { soundManager } from '../../../../../soundManager/SoundManager';

const SETTINGS_NAME = "system";

export default () => {
  const dispatch = useDispatch();

  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const [dirty, setDirty] = useState(false);

  const {
    soundEnabled,
    soundVolume
  } = data;

  const onSoundCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      soundEnabled: checked
    });
    setDirty(true);
  }

  const onSliderBlur = (value) => {
    const calculatedValue = value / 100;
    setData({
      ...data,
      soundEnabled: calculatedValue < 0.01 ? false : true,
      soundVolume: calculatedValue
    });
    setDirty(true);
  }

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));

    soundManager.reload();

    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      setDirty(false);
    });
  }

  return (
    <StyledExpandableSection
      title={"מערכת"}
      TitleIcon={Android}
      iconColor={"#0365a2"}
      extraDetails={() => <SaveButton onClick={save}>שמור</SaveButton>}
      padding={"30px 20px"}
    >

      <Sound
        soundEnabled={soundEnabled}
        soundVolume={soundVolume * 100}
        onSoundCheck={onSoundCheck}
        onSliderBlur={onSliderBlur}
        soundManager={soundManager}
      />

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