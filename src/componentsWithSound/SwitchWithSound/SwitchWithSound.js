import React from 'react';
import { useSound } from '../../soundManager/SoundManager';
import { Switch } from '@material-ui/core';
import update from '../../assets/audio/update.wav';

export default props => {
  const [play] = useSound(update);
  return <Switch {...props} onChange={(event) => {
    play();
    props.onChange && props.onChange(event);
  }} />
}