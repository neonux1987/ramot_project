// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdStats } from 'react-icons/io';

// COMMON COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DateDetails from '../../components/DateDetails/DateDetails';
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import TableSection from '../../components/Section/TableSection';

// CONTAINERS
import QuarterStatsContainer from './QuarterStatsContainer';
import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

// HOOKS
import useDate from '../../customHooks/useDate';

// ACTIONS
import Page from '../../components/Page/Page';
import { fetchBudgetExecutions } from '../../redux/actions/budgetExecutionsActions';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "ביצוע מול תקציב";
const STATS_TITLE = "סיכום הוצאות והכנסות רבעוני";
const TABLE_TITLE = "טבלת מעקב ביצוע מול תקציב";

const BudgetExecutions = props => {
  //building name
  const { buildingName, buildingNameEng } = props.location.state;

  const dispatch = useDispatch();

  const { date, data, isFetching } = useSelector(store => store.budgetExecutions[buildingNameEng]);
  console.log(data, date);

  useEffect(() => {
    const buildingInfo = {
      buildingNameEng,
      buildingName
    };

    // how many rows of data to pull from the database
    const range = {
      startElement: 0,
      pageSize: 1000
    };

    //dispatch(fetchBudgetExecutions(buildingInfo, date, range));
  }, [dispatch, date]);


  if (date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return <Page>

    <PageHeader building={buildingName} page={PAGE_TITLE} />

    <Section
      title={STATS_TITLE}
      TitleIcon={IoMdStats}
      iconColor="rgb(255 0 82)"
    >
      <QuarterStatsContainer
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
      <BudgetExecutionsTableContainer
        location={props.location}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
        data={data}
        isFetching={isFetching}
      />
    </TableSection>

  </Page>


}

export default withRouter(BudgetExecutions);