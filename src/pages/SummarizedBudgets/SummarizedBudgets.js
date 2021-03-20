// LIBRARIES
import React, { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router';
import { ListAlt } from '@material-ui/icons';
import { IoMdStats } from 'react-icons/io';

// COMMON COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import TableSection from '../../components/Section/TableSection';
import Page from '../../components/Page/Page';

// CONTAINERS
import YearStatsContainer from './YearStatsContainer';
import SummarizedBudgetsTableContainer from './SummarizedBudgetsTableContainer';
import { fetchSummarizedBudgets } from '../../redux/actions/summarizedBudgetActions';
import { useDispatch, useSelector } from 'react-redux';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";
const TABLE_TITLE = "טבלת מעקב שנתי";

const SummarizedBudgets = () => {

  const dispatch = useDispatch();

  const { buildingName, buildingNameEng } = useLocation().state;

  const { date, data, isFetching } = useSelector(store => store.summarizedBudgets[buildingNameEng]);

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.month !== "") {
      dispatch(fetchSummarizedBudgets({ buildingNameEng, date }));
    }
  }, [buildingNameEng, dispatch, date]);

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
        buildingName={buildingName}
        buildingNameEng={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
        data={data}
        isFetching={isFetching}
      />

    </TableSection>
  </Page>;

}

export default withRouter(SummarizedBudgets);