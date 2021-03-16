import React from 'react';
import SquareButton from './SquareButton';
import { MoreVert } from '@material-ui/icons';

const MoreButton = ({ onClick }) => <SquareButton
  Icon={MoreVert}
  onClick={onClick}
  margin="0 5px 0 0"
  iconColor="#000000"
/>;

export default MoreButton;