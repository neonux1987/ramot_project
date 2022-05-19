import React from 'react';
import SavedNotification from '../SavedNotification/SavedNotification';
import SectionWithHeader from './SectionWithHeader';

const TableSection = props => {
  return <SectionWithHeader
    {...props}
    id="tableSection"
  >
    {props.children}
    <SavedNotification bgColor={props.bgColor} />
  </SectionWithHeader>;
}

export default React.memo(TableSection);