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
//import SummarizedBudgetTableContainer from './SummarizedBudgetTableContainer';
import YearStatsContainer from './YearStatsContainer';

// DATA PROVIDERS
import DateProvider from '../../renderProps/providers/DateProvider';
import SummarizedBudgetsTableContainer from './SummarizedBudgetsTableContainer';

// HOC
import withPageLogic from '../../HOC/withPageLogic';

// UTILS
import Helper from '../../helpers/Helper';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";
const TABLE_TITLE = "טבלת מעקב שנתית";

const SummarizedBudgets = props => {
  //building name
  const { buildingNameEng } = props.location.state;

  return <Fragment>

    {/* <Header bgColor="rgb(232, 67, 104)">
      {PAGE_TITLE}
    </Header> */}

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
          const onlyDate = date[buildingNameEng];

          return (
            <Fragment>

              <SectionHeader title={STATS_TITLE} TitleIcon={Equalizer} />

              <Section>
                <YearStatsContainer
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </Section>

              <SectionHeader
                title={TABLE_TITLE}
                TitleIcon={TableChart}
                iconBoxBg={"rgb(255, 117, 37)"}
                extraDetails={props.dateDetails(onlyDate)}
              />

              <Section marginBottom={"100px"}>

                <SummarizedBudgetsTableContainer
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
  withPageLogic(SummarizedBudgets)
);