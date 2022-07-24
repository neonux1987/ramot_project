// LIBRARIES
import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

// CSS
import {
  container,
  soundEnabledContainer,
  soundVolumeContainer,
  volumeSlider
} from './Sound.module.css';

// COMPONENTS WITH SOUND
import SliderWithSound from '../../../../../../componentsWithSound/SliderWithSound/SliderWithSound';
import SwitchWithSound from '../../../../../../componentsWithSound/SwitchWithSound/SwitchWithSound';

const Sound = ({ soundEnabled, soundVolume, onSoundCheck, onSliderBlur }) => {

  const [sliderValue, setSliderValue] = useState(soundVolume);

  const onVolumeChange = (event, value) => {
    setSliderValue(value);
  }

  const onChangeCommitted = () => {
    onSliderBlur(sliderValue);
  }

  return (
    <div className={container}>

      <div className={soundEnabledContainer}>
        <SwitchWithSound
          checked={soundEnabled}
          onChange={onSoundCheck}
          name="soundCheck"
          color="primary"
          reverse={1}
        />

        <Typography>
          הפעל צלילים
        </Typography>
      </div>


      <div className={soundVolumeContainer}>
        <Typography id="continuous-slider" gutterBottom>
          ווליום
      </Typography>

        <Grid className={volumeSlider} container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <SliderWithSound
              value={sliderValue}
              onChange={onVolumeChange}
              onChangeCommitted={onChangeCommitted}
              aria-labelledby="continuous-slider"
              step={8}
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Sound;