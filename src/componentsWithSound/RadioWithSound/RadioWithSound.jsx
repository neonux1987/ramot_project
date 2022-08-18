import React from "react";
import { useSound } from "../../soundManager/SoundManager";
import { Radio } from "@material-ui/core";
import update from "../../assets/audio/update.wav";

const RadioWithSound = (props) => {
  const { play } = useSound(update);
  return (
    <Radio
      {...props}
      onChange={(event) => {
        play();
        props.onChange && props.onChange(event);
      }}
    />
  );
};

export default RadioWithSound;
