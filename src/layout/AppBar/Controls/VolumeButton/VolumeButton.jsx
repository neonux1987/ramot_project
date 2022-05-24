import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, saveSettings } from "../../../../redux/actions/settingsActions";
import { soundManager } from "../../../../soundManager/SoundManager";
import ButtonWithSound from "../../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import useIcons from "../../../../customHooks/useIcons";

const VolumeButton = props => {
  const { className = "" } = props;

  const dispatch = useDispatch();
  const [generateIcon] = useIcons();
  const system = useSelector(store => store.settings.data.system);
  const { soundEnabled } = system;

  const onClick = () => {
    dispatch(updateSettings("system", {
      soundEnabled: !soundEnabled
    }));
    soundManager.reload();
    dispatch(saveSettings(false));
  }

  const VolumeOn = generateIcon("volume-on");
  const VolumeOff = generateIcon("volume-off");

  return (
    <ButtonWithSound onClick={onClick} className={className} reverse={1}>
      {soundEnabled ? <VolumeOn /> : <VolumeOff />}
    </ButtonWithSound>
  );

}

export default React.memo(VolumeButton);