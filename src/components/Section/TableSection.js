import React from 'react';
import SavedNotification from '../SavedNotification/SavedNotification';
import Section from './Section';
import { useSelector } from 'react-redux';

const TableSection = props => {
  const isFullscreen = useSelector(store => store.fullscreen.isFullscreen);

  return <Section
    {...props}
    isFullscreen={isFullscreen}
    id="tableSection"
  >
    {props.children}
    <SavedNotification />
  </Section>;
}

export default TableSection;