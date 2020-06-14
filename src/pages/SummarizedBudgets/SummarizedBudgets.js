// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Equalizer, TableChart } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import StyledExpandableSection from '../../components/Section/StyledExpandableSection';
import TableExpandableSection from '../../components/Section/TableExpandableSection';
import DateDetails from '../../components/DateDetails/DateDetails';

// CONTAINERS
import YearStatsContainer from './YearStatsContainer';
import SummarizedBudgetsTableContainer from './SummarizedBudgetsTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { initRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";
const TABLE_TITLE = "טבלת מעקב שנתי";

const SummarizedBudgets = props => {
  //building name
  const { buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
    dispatch(initRegisteredQuarters(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle style={{ paddingTop: "200px" }}><Spinner loadingText={"טוען נתוני עמוד..."} /></AlignCenterMiddle>;

  return <div className={"page"}>

    {/* <StyledExpandableSection
      title={STATS_TITLE}
      TitleIcon={Equalizer}
      iconBoxBg={"rgb(3, 162, 151)"}
    >
      <YearStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </StyledExpandableSection> */}

    <YearStatsContainer
      buildingName={buildingNameEng}
      date={date}
      pageName={PAGE_NAME}
    />

    <TableExpandableSection
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

    </TableExpandableSection>

  </div>;

}

export default withRouter(SummarizedBudgets);