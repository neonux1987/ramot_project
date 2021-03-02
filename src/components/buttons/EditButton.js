import React from 'react';
import SlashModeButton from './SlashModeButton';
import { Edit } from '@material-ui/icons';

const EditButton = props => <SlashModeButton {...props} Icon={Edit} iconColor="#000000" />

export default EditButton;