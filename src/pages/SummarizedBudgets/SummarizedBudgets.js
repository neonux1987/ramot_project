// LIBRARIES
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

// COMMON COMPONENTS
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

// CONTAINERS
//import SummarizedBudgetTableContainer from './SummarizedBudgetTableContainer';
import YearStatsContainer from './YearStatsContainer';

// DATA PROVIDERS
import DateProvider from '../../renderProps/providers/DateProvider';
import SummarizedBudgetTableContainer from './SummarizedBudgetTableContainer';
import Helper from '../../helpers/Helper';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";
const TABLE_TITLE = "טבלת מעקב שנתית";

const SummarizedBudgets = props => {
  //building name
  const { buildingNameEng } = props.location.state;

  return <Fragment>

    <Header bgColor="rgb(232, 67, 104)">
      {PAGE_TITLE}
    </Header>

    <DateProvider
      pageName={PAGE_NAME}
      buildingName={buildingNameEng}
      initState={{
        year: Helper.getCurrentYear()
      }}>
      {({ date, actions }) => {

        if (date === undefined || date[buildingNameEng] === undefined)
          return <AlignCenterMiddle><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;
        else {
          return (
            <Fragment>

              <Section title={STATS_TITLE}>
                <YearStatsContainer
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </Section>

              <Section title={TABLE_TITLE} marginBottom={"100px"}>

                <SummarizedBudgetTableContainer
                  location={props.location}
                  date={date[buildingNameEng]}
                  dateActions={actions}
                  pageName={PAGE_NAME}
                  pageTitle={PAGE_TITLE}
                />

              </Section>

            </Fragment>
          );
        }
      }}
    </DateProvider>

  </Fragment>;

}

export default withRouter(SummarizedBudgets);