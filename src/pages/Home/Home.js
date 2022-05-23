import React from 'react';
import BuildingsStatsContainer from './BuildingsStatsContainer';
import Page from '../../components/Page/Page';
import TitledSection from '../../components/Section/TitledSection';
import useIcons from '../../customHooks/useIcons';

const STATS_TITLE = "סיכום";

const Home = () => {
  const [generateIcon] = useIcons();
  const StatsIcon = generateIcon("stats");
  return (
    <Page>
      <TitledSection title={STATS_TITLE} TitleIcon={StatsIcon}>
        <BuildingsStatsContainer />
      </TitledSection>
    </Page>
  );
}

export default Home;