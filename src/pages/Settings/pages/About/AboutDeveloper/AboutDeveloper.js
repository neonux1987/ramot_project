// LIBRARIES
import React from 'react';
import { Code } from '@material-ui/icons';

// COMPONENTS
import ExpandableSection from '../../../../../components/Section/ExpandableSection';
import BoldUnderlineLabel from '../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel';

const AboutDeveloper = () => {

  return (
    <ExpandableSection
      title={"אודות המפתח"}
      Icon={Code}
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

    </ExpandableSection >
  );
}

export default AboutDeveloper;