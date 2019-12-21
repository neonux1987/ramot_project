// LIBRARIES
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { Equalizer, TableChart } from '@material-ui/icons';

// COMMON COMPONENTS
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

// CONTAINERS
import QuarterStatsContainer from './QuarterStatsContainer';
import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

// DATA PROVIDERS
import DateProvider from '../../renderProps/providers/DateProvider';
import Helper from '../../helpers/Helper';

// HOC
import withPageLogic from '../../HOC/withPageLogic';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "מעקב ביצוע מול תקציב";
const STATS_TITLE = "סיכום הוצאות והכנסות רבעוני";
const TABLE_TITLE = "טבלת מעקב ביצוע מול תקציב";

const BudgetExecutions = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  const quarter = Helper.getCurrentQuarter();

  const initState = {
    quarter,
    quarterHeb: Helper.getQuarterHeb(quarter),
    quarterEng: Helper.getCurrentQuarterEng(quarter),
    year: Helper.getCurrentYear()
  };

  return <Fragment>

    <Header bgColor="rgb(44, 183, 197)">
      {PAGE_TITLE}
    </Header>

    <DateProvider
      pageName={PAGE_NAME}
      buildingName={buildingNameEng}
      initState={initState}
    >
      {({ date, actions }) => {

        if (date === undefined || date[buildingNameEng] === undefined)
          return <AlignCenterMiddle><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;
        else {
          const onlyDate = date[buildingNameEng];

          return (
            <Fragment>

              <SectionHeader title={STATS_TITLE} TitleIcon={Equalizer} />

              <Section>
                <QuarterStatsContainer
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </Section>

              <SectionHeader
                title={TABLE_TITLE}
                TitleIcon={TableChart}
                extraDetails={props.dateDetails(onlyDate)}
              />

              <Section marginBottom={"100px"}>

                <BudgetExecutionsTableContainer
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

export default withRouter(
  withPageLogic(BudgetExecutions)
);