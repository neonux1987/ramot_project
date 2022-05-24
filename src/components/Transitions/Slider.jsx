import React from 'react';
import { Slide } from '@material-ui/core';

const Slider = ({ children, direction = "up", timeout = 500 }) => {
  return (
    <Slide direction={direction} in={true} mountOnEnter unmountOnExit timeout={timeout}>
      <div>
        {children}
      </div>
    </Slide>
  );
}

export default Slider;