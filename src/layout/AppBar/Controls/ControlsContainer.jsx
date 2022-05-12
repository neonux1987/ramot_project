import React from 'react';
import Controls from './Controls';

const ControlsContainer = ({ routes }) => {
  return (
    <Controls
      routes={routes}
    />
  );

}

export default React.memo(ControlsContainer);