// LIBRARIES
import React from 'react';
import { Backup } from '@material-ui/icons';

// CSS


// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../../components/SaveButton/SaveButton';

export default () => {


  return (
    <StyledExpandableSection
      title={"ערכת נושאים"}
      TitleIcon={Backup}
      iconBoxBg={"#1b966e"}
      extraDetails={() => {/* <SaveButton onClick={save}>שמור</SaveButton> */ }}
      padding={"30px 20px"}
    >

      <div>
        בבנייה
      </div>

    </StyledExpandableSection >
  );
}