import React from 'react';
import { useSound } from '../../soundManager/SoundManager';
import { Checkbox } from '@material-ui/core';
import update from '../../assets/audio/update.wav';

const CheckBoxWithSound = props => {
  const { play } = useSound(update);
  return <Checkbox {...props} onChange={(event) => {
    play();
    props.onChange && props.onChange(event);
  }} />
}

export default CheckBoxWithSound;