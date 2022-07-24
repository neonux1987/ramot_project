import React from "react";
import BuildingsStatsContainer from "./BuildingsStatsContainer";
import Page from "../../components/Page/Page";
import TitledSection from "../../components/Section/TitledSection";
import useIcons from "../../customHooks/useIcons";

const Home = () => {
  const [generateIcon] = useIcons();
  const StatIcon = generateIcon("stats");
  const currentDate = new Date();

  return (
    <Page>
      <TitledSection
        title={`תמונת מצב לשנת ${currentDate.getFullYear()}`}
        TitleIcon={StatIcon}
      >
        <BuildingsStatsContainer />
      </TitledSection>
    </Page>
  );
};

export default Home;
