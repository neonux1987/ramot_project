import React from "react";
import ExpandableSection from "../../../../../components/Section/ExpandableSection";
import BoldUnderlineLabel from "../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel";
import DeveloperIcon from "../../../../../components/Icons/DeveloperIcon";

const AboutDeveloper = () => (
  <ExpandableSection
    title={"אודות המפתח"}
    Icon={DeveloperIcon}
    padding={"30px 20px 60px"}
  >
    <BoldUnderlineLabel label={`שם:`}>אנדרי גלמב</BoldUnderlineLabel>

    <BoldUnderlineLabel label={`אימייל:`}>
      neonux1987@gmail.com
    </BoldUnderlineLabel>

    <BoldUnderlineLabel label={`שם חברה:`}>
      NDTS (Noobs Delivering Technology Solutions)
    </BoldUnderlineLabel>
  </ExpandableSection>
);

export default AboutDeveloper;
