// LIBRARIES
import React from 'react';
import { LaptopMac } from '@material-ui/icons';

// COMPONENTS
import ExpandableSection from '../../../../../components/Section/ExpandableSection';
import BoldUnderlineLabel from '../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel';

//ELECTRON
const app = require("electron").remote.app;
const appCurrentVersion = app.getVersion();
const appName = app.name;

const AboutApp = () => {

  return (
    <ExpandableSection
      title={"אודות התוכנה"}
      Icon={LaptopMac}
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

    </ExpandableSection >
  );
}

export default AboutApp;