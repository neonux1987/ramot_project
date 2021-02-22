import React from 'react';
import SlashModeButton from './SlashModeButton';
import { RiFileAddLine } from 'react-icons/ri';

const AddNewButton = props => <SlashModeButton {...props} Icon={RiFileAddLine} iconColor="#000000" />

export default AddNewButton;