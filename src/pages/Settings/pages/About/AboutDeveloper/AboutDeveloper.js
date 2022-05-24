import React from 'react';
import ExpandableSection from '../../../../../components/Section/ExpandableSection';
import BoldUnderlineLabel from '../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel';
import useIcons from '../../../../../customHooks/useIcons';

const AboutDeveloper = () => {
  const [generateIcon] = useIcons();
  const DeveloperIcon = generateIcon("developer");
  return (
    <ExpandableSection
      title={"אודות המפתח"}
      Icon={DeveloperIcon}
      padding={"30px 20px 60px"}
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