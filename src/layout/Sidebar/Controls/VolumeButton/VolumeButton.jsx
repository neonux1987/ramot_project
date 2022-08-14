import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSettings,
  saveSettings
} from "../../../../redux/actions/settingsActions";
import { soundManager } from "../../../../soundManager/SoundManager";
import ButtonWithSound from "../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import VolumeOnIcon from "../../../../components/Icons/VolumeOnIcon";
import VolumeOffIcon from "../../../../components/Icons/VolumeOffIcon";

const VolumeButton = ({ className = "", offClassName = "" }) => {
  const dispatch = useDispatch();

  const system = useSelector((store) => store.settings.data.system);
  const { soundEnabled } = system;

  const onClick = () => {
    dispatch(
      updateSettings("system", {
        soundEnabled: !soundEnabled
      })
    );
    soundManager.reload();
    dispatch(saveSettings(false));
  };

  return (
    <ButtonWithSound
      onClick={onClick}
      className={`${className} ${!soundEnabled ? offClassName : ""}`}
      reverse={1}
    >
      {soundEnabled ? <VolumeOnIcon /> : <VolumeOffIcon />}
    </ButtonWithSound>
  );
};

export default React.memo(VolumeButton);
