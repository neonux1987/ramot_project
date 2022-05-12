import React from 'react';
import { Print } from '@material-ui/icons';
import SquareButton from './SquareButton';

const PrintButton = ({ onClick }) => <SquareButton Icon={Print} onClick={onClick} iconColor="#000000" />;

export default PrintButton;