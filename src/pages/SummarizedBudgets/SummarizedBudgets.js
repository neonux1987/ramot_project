// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
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
import StrippedExpandableSection from '../../components/Section/StrippedExpandableSection';
import SvgIconWrapper from '../../components/SvgIconWrapper/SvgIconWrapper';
import { IoMdStats } from 'react-icons/io';

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
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return <div className={"page"}>

    <StrippedExpandableSection
      title={STATS_TITLE}
      TitleIcon={<SvgIconWrapper Icon={IoMdStats} color="rgb(255 0 82)" />}
      iconColor="rgb(255 0 82)"
    >
      <YearStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </StrippedExpandableSection>

    <TableExpandableSection
      title={TABLE_TITLE}
      TitleIcon={<SvgIconWrapper Icon={ListAlt} color="rgb(25,121,204)" />}
      iconColor="rgb(36 110 173)"
      extraDetails={() => <DateDetails
        month={date.monthHeb}
        quarter={date.quarter}
        year={date.year}
      />}
      marginBottom={"100px"}
      padding={"10px 15px 15px"}
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