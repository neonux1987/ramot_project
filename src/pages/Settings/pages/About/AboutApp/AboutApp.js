// LIBRARIES
import React from 'react';
import { LaptopMac } from '@material-ui/icons';

// COMPONENTS
import StyledExpandableSection from '../../../../../components/Section/StyledExpandableSection';
import BoldUnderlineLabel from '../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel';

//ELECTRON
const app = require("electron").remote.app;
const appCurrentVersion = app.getVersion();
const appName = app.name;

const AboutApp = () => {

  return (
    <StyledExpandableSection
      title={"אודות התוכנה"}
      TitleIcon={LaptopMac}
      padding={"30px 20px 60px"}
      iconColor={"#0365a2"}
    >

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

export default AboutApp;