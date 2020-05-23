// LIBRARIES
import React from 'react';
import { Code } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import BoldUnderlineLabel from '../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel';

const AboutDeveloper = () => {

  return (
    <StyledExpandableSection
      title={"אודות המפתח"}
      TitleIcon={Code}
      padding={"30px 20px 60px"}
      iconColor={"#0365a2"}
    >

      <BoldUnderlineLabel label={`שם:`}>
        אנדרי גלמב
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`אימייל:`}>
        neonux1987@gmail.com
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`שם חברה:`}>
        NDTS (Noobs Delivering Technology Solutions)
      </BoldUnderlineLabel>

    </StyledExpandableSection >
  );
}

export default AboutDeveloper;