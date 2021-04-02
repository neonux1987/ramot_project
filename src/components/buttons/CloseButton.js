import React from 'react';
import SquareButton from './SquareButton';
import { MdClose } from 'react-icons/md';

const CloseButton = ({ onClick }) => <SquareButton Icon={MdClose} onClick={onClick} />;

export default CloseButton;