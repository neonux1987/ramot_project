import React from 'react';
import BuildingsStatsContainer from './BuildingsStatsContainer';
import Page from '../../components/Page/Page';
import Section from '../../components/Section/Section';

const Home = () => {
  return (
    <Page>
      <Section>
        <BuildingsStatsContainer />
      </Section>
    </Page>
  );
}

export default Home;