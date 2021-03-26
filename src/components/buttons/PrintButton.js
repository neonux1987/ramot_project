import React from 'react';
import SquareButton from './SquareButton';
import { Print } from '@material-ui/icons';

const PrintButton = ({ onClick }) => <SquareButton Icon={Print} onClick={onClick} iconColor="#0088ca" />;

export default PrintButton;