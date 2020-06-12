import React from 'react';
import { useSound } from '../../soundManager/SoundManager';
import { Button } from '@material-ui/core';
import action from '../../assets/audio/action.wav';

export default props => {
  const { play } = useSound(action, {
    reverse: props.reverse ? props.reverse : 0
  });
  return <Button {...props} onClick={(event) => {
    play();
    props.onClick && props.onClick(event);
  }}>{props.children}</Button>
}