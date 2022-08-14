import React, { useEffect, useState } from "react";
import ExpandableSection from "../../../../../components/Section/ExpandableSection";
import BoldUnderlineLabel from "../../../../../components/BoldUnderlineLabel/BoldUnderlineLabel";
import { getAppInfo } from "../../../../../services/mainProcess.svc";
import AboutIcon from "../../../../../components/Icons/AboutIcon";

const AboutApp = () => {
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    const fetchAppInfo = async () => {
      const data = await getAppInfo();
      setAppInfo(data);
    };

    fetchAppInfo();
  }, []);

  return (
    <ExpandableSection
      title={"אודות התוכנה"}
      Icon={AboutIcon}
      loading={appInfo === null}
    >
      <BoldUnderlineLabel label={`שם תוכנה:`}>
        קבוצת רמות ניהול הוצאות והכנסות
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`שם תוכנה באנגלית:`}>
        {appInfo && appInfo.appName}
      </BoldUnderlineLabel>

      <BoldUnderlineLabel label={`גירסה נוכחית:`}>
        {appInfo && appInfo.appVersion}
      </BoldUnderlineLabel>
    </ExpandableSection>
  );
};

export default AboutApp;
