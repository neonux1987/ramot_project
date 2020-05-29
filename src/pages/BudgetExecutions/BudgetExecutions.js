// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Equalizer, TableChart } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import StyledExpandableSection from '../../components/Section/StyledExpandableSection';
import DateDetails from '../../components/DateDetails/DateDetails';

// CONTAINERS
import QuarterStatsContainer from './QuarterStatsContainer';
import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

// UTILS
import Helper from '../../helpers/Helper';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import { fetchRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { fetchRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';
import { updateDate } from '../../redux/actions/dateActions';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "לב תל אביב - מעקב ביצוע מול תקציב";
const STATS_TITLE = "סיכום הוצאות והכנסות רבעוני";
const TABLE_TITLE = "טבלת מעקב ביצוע מול תקציב";

const BudgetExecutions = props => {

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
      <QuarterStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </StyledExpandableSection>

    <StyledExpandableSection
      marginBottom={"100px"}
      title={TABLE_TITLE}
      TitleIcon={TableChart}
      extraDetails={() => <DateDetails
        month={date.monthHeb}
        quarter={date.quarter}
        year={date.year}
      />}
    >
      <BudgetExecutionsTableContainer
        location={props.location}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
      />
    </StyledExpandableSection>

  </div>


}

export default withRouter(BudgetExecutions);