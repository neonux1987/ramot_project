// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { TableChart } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import TableExpandableSection from '../../components/Section/TableExpandableSection';
import DateDetails from '../../components/DateDetails/DateDetails';
import SvgIconWrapper from '../../components/SvgIconWrapper/SvgIconWrapper';

// CONTAINERS
import QuarterStatsContainer from './QuarterStatsContainer';
import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import { initRegisteredYears } from '../../redux/actions/registeredYearsActions';
import { initRegisteredQuarters } from '../../redux/actions/registeredQuartersActions';
import StrippedExpandableSection from '../../components/Section/StrippedExpandableSection';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "מעקב ביצוע מול תקציב";
const STATS_TITLE = "סיכום הוצאות והכנסות רבעוני";
const TABLE_TITLE = "טבלת מעקב ביצוע מול תקציב";

const BudgetExecutions = props => {

  //building name
  const { buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
    dispatch(initRegisteredQuarters(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return <div className={"page"}>

    <StrippedExpandableSection title={STATS_TITLE} TitleIcon={<SvgIconWrapper Icon={IoMdStats} color="rgb(241, 52, 117)" />}>
      <QuarterStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </StrippedExpandableSection>

    <TableExpandableSection
      marginBottom={"100px"}
      padding={"0px 15px 15px"}
      title={TABLE_TITLE}
      TitleIcon={<TableChart />}
      iconColor="rgb(25, 121, 204)"
      extraDetails={() => <DateDetails
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
    </TableExpandableSection>

  </div>


}

export default withRouter(BudgetExecutions);