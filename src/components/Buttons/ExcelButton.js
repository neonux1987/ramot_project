import React from 'react';
import SquareButton from './SquareButton';
import { RiFileExcel2Line } from 'react-icons/ri';

const ExcelButton = ({ onClick }) => <SquareButton Icon={RiFileExcel2Line} onClick={onClick} iconColor="#1c8c49" />;

export default ExcelButton;