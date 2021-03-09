// LIBRARIES
import React from 'react';

// COMPONENTS
import ExpandableSection from '../ExpandableSection';
import SaveButton from '../../buttons/SaveButton/SaveButton';

const SettingsExpandableSection = ({
  title,
  Icon,
  bgColor,
  children,
  onSaveClick
}) => {

  return <ExpandableSection
    title={title}
    Icon={Icon}
    bgColor={bgColor}
    extraDetails={<SaveButton onClick={onSaveClick}>שמור</SaveButton>}
  >
    {children}
  </ExpandableSection>

}

export default SettingsExpandableSection;