

import React from 'react';
import SavedNotification from '../../Main/Toolbar/SavedNotification/SavedNotification';
import StrippedExpandableSection from './StrippedExpandableSection';

export default props => {

  return (
    <StrippedExpandableSection
      margin="0px 20px 40px"
      headerStyles={{ borderBottom: "none" }}
      {...props}
    >
      {props.children}
      <SavedNotification />
    </StrippedExpandableSection>
  );
}