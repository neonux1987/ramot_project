import React from 'react';
import { useSound } from '../../soundManager/SoundManager';
import { Button } from '@material-ui/core';
import action from '../../assets/audio/action.wav';

export default React.forwardRef((props, ref) => {
  const { play } = useSound(action, {
    reverse: props.reverse ? props.reverse : 0
  });

  return <Button
    {...props}
    onClick={(event) => {
      play();
      props.onClick && props.onClick(event);
    }}
    ref={ref}
  >
    {props.children}
  </Button>
});