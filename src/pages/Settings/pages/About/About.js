// LIBRARIES
import React from 'react';
import { Info } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import BoldUnderlineLabel from '../../../../components/BoldUnderlineLabel/BoldUnderlineLabel';
import CustomDivider from '../../../../components/CustomDivider/CustomDivider';
import SubtitleBoldTypography from '../../../../components/Typographies/SubtitleBoldTypography';


//ELECTRON
const app = require("electron").remote.app;
const appCurrentVersion = app.getVersion();
const appName = app.name;

const About = () => {

  return (
    <StyledExpandableSection
      title={"אודות התוכנה"}
      TitleIcon={Info}
      padding={"30px 20px 60px"}
      iconColor={"#0365a2"}
    >

      <SubtitleBoldTypography underline style={{ marginBottom: "10px" }}>
        פותח ע"י:
        </SubtitleBoldTypography>

      <BoldUnderlineLabel label={`שם:`}>
        אנדרי גלמב
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`אימייל:`}>
        neonux1987@gmail.com
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`שם חברה:`}>
        NDTS (Noobs Delivering Technology Solutions)
      </BoldUnderlineLabel>


      <CustomDivider />

      <SubtitleBoldTypography underline style={{ marginBottom: "10px" }}>
        מידע על התוכנה:
        </SubtitleBoldTypography>

      <BoldUnderlineLabel label={`שם תוכנה:`}>
        קבוצת רמות ניהול הוצאות והכנסות
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`שם תוכנה באנגלית:`}>
        {appName}
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`גירסה נוכחית:`}>
        {appCurrentVersion}
      </BoldUnderlineLabel>

    </StyledExpandableSection >
  );
}

export default About;