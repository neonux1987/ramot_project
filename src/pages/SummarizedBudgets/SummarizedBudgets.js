// LIBRARIES
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { Equalizer, TableChart } from '@material-ui/icons';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

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
import StyledExpandableSection from '../../components/Section/StyledExpandableSection';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";
const TABLE_TITLE = "טבלת מעקב שנתי";

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

              <StyledExpandableSection
                title={STATS_TITLE}
                TitleIcon={Equalizer}
              >
                <YearStatsContainer
                  buildingName={buildingNameEng}
                  date={date[buildingNameEng]}
                  pageName={PAGE_NAME}
                />
              </StyledExpandableSection>

              <StyledExpandableSection
                title={TABLE_TITLE}
                TitleIcon={TableChart}
                extraDetails={props.dateDetails(onlyDate)}
                marginBottom={"100px"}
              >

                <SummarizedBudgetsTableContainer
                  location={props.location}
                  date={date[buildingNameEng]}
                  dateActions={actions}
                  pageName={PAGE_NAME}
                  pageTitle={PAGE_TITLE}
                />

              </StyledExpandableSection>

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