import React from 'react';
import SavedNotification from '../../Main/Toolbar/SavedNotification/SavedNotification';
import StyledSection from './StyledSection';

const TableSection = props => {

  return (
    <StyledSection {...props}>
      {props.children}
      <SavedNotification />
    </StyledSection>
  );
}

export default TableSection;