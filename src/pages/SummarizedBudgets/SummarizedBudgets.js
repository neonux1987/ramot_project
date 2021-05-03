// LIBRARIES
import React, { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router';
import { IoMdStats } from 'react-icons/io';

// COMMON COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';
import Page from '../../components/Page/Page';

// CONTAINERS
import YearStatsContainer from './YearStatsContainer';
import SummarizedBudgetsTableContainer from './SummarizedBudgetsTableContainer';
import { fetchSummarizedBudgets } from '../../redux/actions/summarizedBudgetActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomDivider from '../../components/CustomDivider/CustomDivider';

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const STATS_TITLE = "סיכום הוצאות והכנסות שנתי";

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
    <PageHeader buildingName={buildingName} buildingNameEng={buildingNameEng} page={PAGE_TITLE} />

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

    <CustomDivider mt={0} mr={20} mb={40} ml={20} />

    <SummarizedBudgetsTableContainer
      buildingName={buildingName}
      buildingNameEng={buildingNameEng}
      date={date}
      pageName={PAGE_NAME}
      pageTitle={PAGE_TITLE}
      data={data}
      isFetching={isFetching}
    />
  </Page>;

}

export default withRouter(SummarizedBudgets);