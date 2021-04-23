import React from 'react';
import SavedNotification from '../SavedNotification/SavedNotification';
import Section from './Section';
import { useSelector } from 'react-redux';
import { css } from 'emotion';

const container = css`
  box-shadow: 0 0 10px 4px rgb(0 0 0 / 2%);
`;

const TableSection = props => {
  const isFullscreen = useSelector(store => store.fullscreen.isFullscreen);

  return <Section
    className={container}
    {...props}
    isFullscreen={isFullscreen}
    id="tableSection"
  >
    {props.children}
    <SavedNotification />
  </Section>;
}

export default TableSection;