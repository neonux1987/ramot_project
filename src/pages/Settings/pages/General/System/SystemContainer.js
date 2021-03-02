// LIBRARIES
import React, { useState } from 'react';
import { Android } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import Sound from './Sound/Sound';
import SaveButton from '../../../../../components/buttons/SaveButton/SaveButton';
import FileSelector from '../../../../../components/FileSelector/FileSelector';
import TitleTypography from '../../../../../components/Typographies/TitleTypography';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../../redux/actions/settingsActions';

// SOUND
import { soundManager } from '../../../../../soundManager/SoundManager';
import Divider from '../../../../../components/Divider/Divider';
import { setDirty } from '../../../../../redux/actions/goodByeActions';
import { openItem } from '../../../../../services/mainProcess.svc';

const SETTINGS_NAME = "system";

export default () => {
  const dispatch = useDispatch();

  const settings = useSelector(store => store.settings.data[SETTINGS_NAME]);

  const [data, setData] = useState(settings);

  const {
    soundEnabled,
    soundVolume,
    config_folder_path
  } = data;

  const onSoundCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      soundEnabled: checked
    });
    dispatch(setDirty());
  }

  const onSliderBlur = (value) => {
    const calculatedValue = value / 100;
    setData({
      ...data,
      soundEnabled: calculatedValue < 0.01 ? false : true,
      soundVolume: calculatedValue
    });
    dispatch(setDirty());
  }

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));

    soundManager.reload();

    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
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

      <TitleTypography gutterBottom>
        הגדרות צלילי מערכת:
      </TitleTypography>

      <Sound
        soundEnabled={soundEnabled}
        soundVolume={soundVolume * 100}
        onSoundCheck={onSoundCheck}
        onSliderBlur={onSliderBlur}
        soundManager={soundManager}
      />

      <Divider />

      <TitleTypography>
        מיקום תיקיית הגדרות מערכת:
      </TitleTypography>

      <FileSelector buttonLabel="פתח תיקייה" onOpenClick={() => openItem(config_folder_path)} value={config_folder_path} />

    </StyledExpandableSection >
  );
}