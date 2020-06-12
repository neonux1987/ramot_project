

import React from 'react';
import SavedNotification from '../../Main/Toolbar/SavedNotification/SavedNotification';
import StyledExpandableSection from './StyledExpandableSection';

export default props => {

  return (
    <StyledExpandableSection
      {...props}
    >
      {props.children}
      <SavedNotification />
    </StyledExpandableSection>
  );
}