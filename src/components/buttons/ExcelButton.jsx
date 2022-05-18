import React from 'react';
import SquareButton from './SquareButton';
import useIcons from '../../customHooks/useIcons';

const ExcelButton = ({ onClick }) => {
  const [generateIcon] = useIcons();
  return <SquareButton Icon={generateIcon("excel")} onClick={onClick} iconColor="#000000" />;
}


export default ExcelButton;