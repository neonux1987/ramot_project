import React from 'react';
import SlashModeButton from './SlashModeButton';
import { Edit } from '@material-ui/icons';
import useIcons from '../../customHooks/useIcons';

const EditButton = props => {
  const [generateIcon] = useIcons();
  return <SlashModeButton {...props} Icon={generateIcon("edit")} />;
}

export default EditButton;