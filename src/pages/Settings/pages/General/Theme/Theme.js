// LIBRARIES
import React from 'react';
import { Backup } from '@material-ui/icons';

// CSS


// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';

export default () => {


  return (
    <StyledExpandableSection
      title={"ערכת נושאים"}
      TitleIcon={Backup}
      iconColor={"#0365a2"}
      extraDetails={() => {/* <SaveButton onClick={save}>שמור</SaveButton> */ }}
      padding={"30px 20px"}
    >

      <div>
        בבנייה
      </div>

    </StyledExpandableSection >
  );
}