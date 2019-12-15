// LIBRARIES IMPORTS
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS IMPORTS
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';

// DATA FETHCER
import MonthExpansesTableContainer from './MonthExpansesTableContainer';

const MonthExpanses = props => {

  return (
    <Fragment>

      <Header bgColor="rgb(44, 183, 197)">
        {"מעקב הוצאות חודשיות"}
      </Header>

      <Section title={"טבלת מעקב הוצאות חודשי"}>

        <MonthExpansesTableContainer location={props.location} />

      </Section>

    </Fragment>
  );
}

export default withRouter(MonthExpanses)