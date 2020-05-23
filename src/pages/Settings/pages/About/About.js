// LIBRARIES
import React, { Fragment } from 'react';

// COMPONENTS
import AboutDeveloper from './AboutDeveloper/AboutDeveloper';
import AboutApp from './AboutApp/AboutApp';

const About = () => {

  return (
    <Fragment>
      <AboutDeveloper />
      <AboutApp />
    </Fragment>
  );
}

export default About;