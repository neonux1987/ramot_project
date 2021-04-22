import React from 'react';
import SquareButton from './SquareButton';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

const FullScreenButton = ({ isFullscreen, onClick }) => {
  const Icon = isFullscreen ? MdFullscreenExit : MdFullscreen;
  return <SquareButton Icon={Icon} onClick={onClick} iconColor="#555" />
};

export default FullScreenButton;