// LIBRARIES
import React from 'react';

// COMPONENTS
import AboutDeveloper from './AboutDeveloper/AboutDeveloper';
import AboutApp from './AboutApp/AboutApp';
import Page from '../../../../components/Page/Page';

const About = () => {

  return <Page>
    <AboutApp />
    <AboutDeveloper />
  </Page>;
}

export default About;