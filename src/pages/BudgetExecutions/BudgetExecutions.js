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
import SimplePageHeader from '../../components/PageHeader/SimplePageHeader';
import useIconWrapper from '../../customHooks/useIconWrapper';

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "ביצוע מול תקציב";

const BudgetExecutions = () => {
  const dispatch = useDispatch();
  const { buildingName, buildingId } = useLocation().state;
  const { date, data, isFetching } = useSelector(store => store.budgetExecutions[buildingId]);
  const [getIcon] = useIconWrapper();

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.quarter !== "") {
      const buildingInfo = {
        buildingId,
        buildingName
      };

      dispatch(fetchBudgetExecutions(buildingInfo, date));
    }
  }, [dispatch, buildingId, buildingName, date]);

  const Icon = getIcon({ iconName: "bxs:doughnut-chart", width: "36px", height: "36px" });
  const TableIcon = getIcon({ iconName: "bi:table", width: "28px", height: "28px" });

  return <Page>
    <PageHeader buildingName={buildingName} buildingId={buildingId} page={PAGE_TITLE} />
    <SimplePageHeader title={"סטטיסטיקה"} icon={<Icon />} />

    <Section>
      <QuarterStatsContainer
        buildingId={buildingId}
        date={date}
        pageName={PAGE_NAME}
      />
    </Section>

    <SimplePageHeader title={"טבלת מעקב"} icon={<TableIcon />} />
    <BudgetExecutionsTableContainer
      buildingName={buildingName}
      buildingId={buildingId}
      date={date}
      pageName={PAGE_NAME}
      pageTitle={PAGE_TITLE}
      data={data}
      isFetching={isFetching}
    />
  </Page>;
}

export default BudgetExecutions;