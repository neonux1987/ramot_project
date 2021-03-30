import React, { useState } from 'react';
import SavedNotification from '../../Main/Toolbar/SavedNotification/SavedNotification';
import FullScreenButton from '../buttons/FullScreenButton';
import StyledSection from './StyledSection';

const TableSection = props => {

  const [isFullscreen, setIsFullscreen] = useState(false);

  const onClick = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
    }
    else {
      setIsFullscreen(false);
    }

  }

  return <StyledSection
    {...props}
    isFullscreen={isFullscreen}
    extraDetails={<FullScreenButton isFullscreen={isFullscreen} onClick={onClick} />}
  >
    {props.children}
    <SavedNotification />
  </StyledSection>;
}

export default TableSection;