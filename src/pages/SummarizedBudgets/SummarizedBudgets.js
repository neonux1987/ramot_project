// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { IoMdStats } from 'react-icons/io';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateDetails from '../../components/DateDetails/DateDetails';
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import TableSection from '../../components/Section/TableSection';
import Page from '../../components/Page/Page';

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
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const [date] = useDate(PAGE_NAME, buildingNameEng);

  useEffect(() => {
    dispatch(initRegisteredYears(PAGE_NAME, buildingNameEng));
    dispatch(initRegisteredQuarters(PAGE_NAME, buildingNameEng));
  }, [dispatch, buildingNameEng]);

  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return <Page>

    <PageHeader building={buildingName} page={PAGE_TITLE} />

    <Section
      title={STATS_TITLE}
      TitleIcon={IoMdStats}
      iconColor="rgb(255 0 82)"
    >
      <YearStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </Section>

    <TableSection
      title={TABLE_TITLE}
      Icon={ListAlt}
      bgColor="rgb(0, 143, 251)"
    >

      <SummarizedBudgetsTableContainer
        location={props.location}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
      />

    </TableSection>

  </Page>;

}

export default withRouter(SummarizedBudgets);