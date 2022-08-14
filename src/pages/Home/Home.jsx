import React from "react";
import BuildingsStatsContainer from "./BuildingsStatsContainer";
import Page from "../../components/Page/Page";
import TitledSection from "../../components/Section/TitledSection";
import DonutIcon from "../../components/Icons/DonutIcon";

const Home = () => {
  const currentDate = new Date();

  return (
    <Page>
      <TitledSection
        title={`תמונת מצב לשנת ${currentDate.getFullYear()}`}
        TitleIcon={DonutIcon}
      >
        <BuildingsStatsContainer />
      </TitledSection>
    </Page>
  );
};

export default Home;
