// LIBRARIES
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// COMMON COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Section from '../../components/Section/Section';

// CONTAINERS
import QuarterStatsContainer from './QuarterStatsContainer';
import BudgetExecutionsTableContainer from './BudgetExecutionsTableContainer';

// ACTIONS
import Page from '../../components/Page/Page';
import { fetchBudgetExecutions } from '../../redux/actions/budgetExecutionsActions';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "ביצוע מול תקציב";

const BudgetExecutions = () => {

  const dispatch = useDispatch();

  const { buildingName, buildingNameEng } = useLocation().state;

  const { date, data, isFetching } = useSelector(store => store.budgetExecutions[buildingNameEng]);

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.quarter !== "") {
      const buildingInfo = {
        buildingNameEng,
        buildingName
      };

      dispatch(fetchBudgetExecutions(buildingInfo, date));
    }
  }, [dispatch, buildingNameEng, buildingName, date]);

  return <Page>
    <PageHeader buildingName={buildingName} buildingNameEng={buildingNameEng} page={PAGE_TITLE} />

    <Section>
      <QuarterStatsContainer
        buildingName={buildingNameEng}
        date={date}
        pageName={PAGE_NAME}
      />
    </Section>

    <BudgetExecutionsTableContainer
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

export default BudgetExecutions;