import React from 'react';
import useFullscreen from '../../customHooks/useFullscreen';
import SavedNotification from '../SavedNotification/SavedNotification';
import FullScreenButton from '../buttons/FullScreenButton';
import StyledSection from './StyledSection';

const TableSection = props => {

  const [isFullscreen, toggle] = useFullscreen();

  return <StyledSection
    {...props}
    isFullscreen={isFullscreen}
    extraDetails={<FullScreenButton isFullscreen={isFullscreen} onClick={toggle} />}
  >
    {props.children}
    <SavedNotification />
  </StyledSection>;
}

export default TableSection;