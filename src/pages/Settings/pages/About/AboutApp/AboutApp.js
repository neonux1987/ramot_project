import React from "react";
import ExpandableSection from "../../../../../components/Section/ExpandableSection";
import BoldUnderlineLabel from "../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel";
import useIcons from "../../../../../customHooks/useIcons";

//ELECTRON
const app = require("@electron/remote").app;
const appCurrentVersion = app.getVersion();
const appName = app.name;

const AboutApp = () => {
  const [generateIcon] = useIcons();
  const AboutIcon = generateIcon("about");
  return (
    <ExpandableSection title={"אודות התוכנה"} Icon={AboutIcon}>
      <BoldUnderlineLabel label={`שם תוכנה:`}>
        קבוצת רמות ניהול הוצאות והכנסות
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`שם תוכנה באנגלית:`}>
        {appName}
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`גירסה נוכחית:`}>
        {appCurrentVersion}
      </BoldUnderlineLabel>
    </ExpandableSection>
  );
};

export default AboutApp;
