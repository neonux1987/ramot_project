import React from 'react';
import { useSound } from '../../soundManager/SoundManager';
import { Slider } from '@material-ui/core';
import slide from '../../assets/audio/slide.wav';

const SliderWithSound = props => {
  const { play, setOptions } = useSound(slide);

  return <Slider
    {...props}
    onChange={(event, value) => {
      setOptions({ soundVolume: props.value / 100 })
      props.onChange && props.onChange(event, value)
    }}
    onChangeCommitted={(event) => {
      play();
      props.onChangeCommitted && props.onChangeCommitted(event)
    }}
  />;
}

export default SliderWithSound;