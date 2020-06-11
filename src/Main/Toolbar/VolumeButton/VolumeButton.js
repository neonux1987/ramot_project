// LIBRARIES
import React from "react";
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, saveSettings } from "../../../redux/actions/settingsActions";
import { soundManager } from "../../../soundManager/SoundManager";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

const VolumeButton = props => {
  const { className = "" } = props;

  const dispatch = useDispatch();

  const system = useSelector(store => store.settings.data.system);
  const { soundEnabled } = system;

  const onClick = () => {
    dispatch(updateSettings("system", {
      soundEnabled: !soundEnabled
    }));
    soundManager.reload();
    dispatch(saveSettings(false));
  }

  return (
    <ButtonWithSound onClick={onClick} className={className} reverse={1}>
      {soundEnabled ? <VolumeUp /> : <VolumeOff />}
    </ButtonWithSound>
  );

}

export default React.memo(VolumeButton);