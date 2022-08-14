import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sound from "./Sound/Sound";
import SettingsExpandableSection from "../../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection";
import FileSelector from "../../../../../components/FileSelector/FileSelector";
import TitleTypography from "../../../../../components/Typographies/TitleTypography";
import {
  updateSettings,
  saveSettings
} from "../../../../../redux/actions/settingsActions";
import { soundManager } from "../../../../../soundManager/SoundManager";
import Divider from "../../../../../components/Divider/Divider";
import { setDirty } from "../../../../../redux/actions/routerPromptActions";
import { openItem } from "../../../../../services/mainProcess.svc";
import AndroidIcon from "../../../../../components/Icons/AndroidIcon";

const SETTINGS_NAME = "system";

const SystemContainer = () => {
  const dispatch = useDispatch();
  const settings = useSelector((store) => store.settings.data[SETTINGS_NAME]);
  const [data, setData] = useState(settings);

  const { soundEnabled, soundVolume, config_folder_path } = data;

  const onSoundCheck = (event) => {
    const { checked } = event.target;
    setData({
      ...data,
      soundEnabled: checked
    });
    dispatch(setDirty());
  };

  const onSliderBlur = (value) => {
    const calculatedValue = value / 100;
    setData({
      ...data,
      soundEnabled: calculatedValue < 0.01 ? false : true,
      soundVolume: calculatedValue
    });
    dispatch(setDirty());
  };

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy));

    soundManager.reload();

    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  };

  return (
    <SettingsExpandableSection
      title={"מערכת"}
      Icon={AndroidIcon}
      onSaveClick={save}
    >
      <TitleTypography gutterBottom>הגדרות צלילי מערכת:</TitleTypography>

      <Sound
        soundEnabled={soundEnabled}
        soundVolume={soundVolume * 100}
        onSoundCheck={onSoundCheck}
        onSliderBlur={onSliderBlur}
        soundManager={soundManager}
      />

      <Divider />

      <TitleTypography>מיקום תיקיית הגדרות מערכת:</TitleTypography>

      <FileSelector
        buttonLabel="פתח תיקייה"
        onOpenClick={() => openItem(config_folder_path)}
        value={config_folder_path}
      />
    </SettingsExpandableSection>
  );
};

export default SystemContainer;
