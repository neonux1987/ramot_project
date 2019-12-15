// LIBRARIES IMPORTS
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS IMPORTS
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';

import QuarterStatsContainer from './QuarterStatsContainer';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateProvider from '../../renderProps/providers/DateProvider';

import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "מעקב ביצוע מול תקציב";
const STATS_TITLE = "סיכום הוצאות והכנסות רבעוני";
const TABLE_TITLE = "טבלת מעקב הוצאות חודשי";

const BudgetExecutions = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  return <Fragment>

    <Header bgColor="rgb(44, 183, 197)">
      {PAGE_TITLE}
    </Header>

    <DateProvider pageName={PAGE_NAME} buildingName={buildingNameEng}>
      {(date) => {

        if (date === undefined || date[buildingNameEng] === undefined)
          return <AlignCenterMiddle><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;
        else {
          return (
            <Fragment>

              <Section title={STATS_TITLE}>
                <QuarterStatsContainer
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </Section>

              <Section title={TABLE_TITLE}>

                <BudgetExecutionsTableContainer
                  location={props.location}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                  pageTitle={PAGE_TITLE}
                />

              </Section>

            </Fragment>
          );
        }
      }}
    </DateProvider>

  </Fragment>


}

export default withRouter(BudgetExecutions);