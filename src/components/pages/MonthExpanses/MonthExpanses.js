// LIBRARIES IMPORTS
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS IMPORTS
import Header from '../../common/Header/Header';
import Section from '../../common/Section/Section';

// DATA FETHCER
import MonthExpansesTable from './MonthExpansesTable';

const MonthExpanses = (props) => {

  return (
    <Fragment>

      <Header>
        {"מעקב הוצאות חודשיות"}
      </Header>

      <Section title={"טבלת מעקב הוצאות חודשי"}>

        <MonthExpansesTable location={props.location} />

      </Section>

    </Fragment>
  );
}

export default withRouter(MonthExpanses)