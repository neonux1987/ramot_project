import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import SavedNotification from '../../Main/Toolbar/SavedNotification/SavedNotification';
import DefaultButton from '../buttons/DefaultButton';
import FullScreenButton from '../buttons/FullScreenButton';
import StyledSection from './StyledSection';

const TableSection = props => {

  const [isFullscreen, setIsFullscreen] = useState(false);
  const handle = useFullScreenHandle();

  const onClick = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      handle.enter();
    }
    else {
      setIsFullscreen(false);
      handle.exit();
    }

  }

  return <FullScreen handle={handle}>
    <StyledSection
      {...props}
      fullscreen={isFullscreen}
      extraDetails={<FullScreenButton isFullscreen={isFullscreen} onClick={onClick} />}
    >
      {props.children}
      <SavedNotification />
    </StyledSection>;
  </FullScreen>
}

export default TableSection;