import React from 'react';
import SquareButton from './SquareButton';
import { RiFileExcelLine } from 'react-icons/ri';

const ExcelButton = ({ onClick }) => <SquareButton Icon={RiFileExcelLine} onClick={onClick} iconColor="#0f9a87" />;

export default ExcelButton;