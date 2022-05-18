import React from 'react';
import SquareButton from './SquareButton';
import useIcons from '../../customHooks/useIcons';

const PrintButton = ({ onClick }) => {
  const [generateIcon] = useIcons();
  return <SquareButton Icon={generateIcon("print")} onClick={onClick} iconColor="#000000" />;
}

export default PrintButton;