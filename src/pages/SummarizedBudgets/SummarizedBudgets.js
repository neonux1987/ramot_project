// LIBRARIES
import React from 'react';
import { withRouter } from 'react-router';
import { Equalizer, TableChart } from '@material-ui/icons';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

// CONTAINERS
//import SummarizedBudgetTableContainer from './SummarizedBudgetTableContainer';
import YearStatsContainer from './YearStatsContainer';


import SummarizedBudgetsTableContainer from './SummarizedBudgetsTableContainer';


// UTILS
import StyledExpandableSection from '../../components/Section/StyledExpandableSection';
import useDate from '../../customHooks/useDate';

import DateDetails from '../../components/DateDetails/DateDetails';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";
const TABLE_TITLE = "טבלת מעקב שנתי";

const SummarizedBudgets = props => {
  //building name
  const { buildingNameEng } = props.location.state;

  const [date] = useDate(PAGE_NAME, buildingNameEng);


  if (date === undefined)
    return <AlignCenterMiddle style={{ paddingTop: "200px" }}><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;

  return <div className={"page"}>

    <StyledExpandableSection
      title={STATS_TITLE}
      TitleIcon={Equalizer}
      iconBoxBg={"rgb(3, 162, 151)"}
    >
      <YearStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </StyledExpandableSection>

    <StyledExpandableSection
      title={TABLE_TITLE}
      TitleIcon={TableChart}
      extraDetails={() => <DateDetails
        month={date.monthHeb}
        quarter={date.quarter}
        year={date.year}
      />}
      marginBottom={"100px"}
    >

      <SummarizedBudgetsTableContainer
        location={props.location}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
      />

    </StyledExpandableSection>

  </div>;

}

export default withRouter(SummarizedBudgets);