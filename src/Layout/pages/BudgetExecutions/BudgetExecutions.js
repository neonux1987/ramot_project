// LIBRARIES IMPORTS
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS IMPORTS
import Header from '../../../components/common/Header/Header';
import Section from '../../../components/common/Section/Section';

import QuarterStatsContainer from './QuarterStatsContainer';
import { AlignCenterMiddle } from '../../../components/common/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../../components/common/Spinner/Spinner';
import DateProvider from '../../../renderProps/providers/DateProvider';

import BudgetExecutionsTableContainer from '../../../containers/pages/BudgetExecutions/BudgetExecutionsTableContainer';

const PAGE_NAME = "budgetExecutions";

const BudgetExecutions = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  return <Fragment>

    <Header bgColor="rgb(44, 183, 197)">
      {"מעקב ביצוע מול תקציב"}
    </Header>

    <DateProvider pageName={PAGE_NAME} buildingName={buildingNameEng}>
      {(date) => {

        if (date === undefined || date[buildingNameEng] === undefined)
          return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים..."} /></AlignCenterMiddle>;
        else {
          return (
            <Fragment>

              <Section title={"סיכום הוצאות והכנסות רבעוני"}>
                <QuarterStatsContainer
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </Section>

              <Section title={"טבלת מעקב הוצאות חודשי"}>

                <BudgetExecutionsTableContainer
                  location={props.location}
                  date={date}
                  pageName={PAGE_NAME}
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