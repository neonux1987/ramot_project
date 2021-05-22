// LIBRARIES
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

// COMPONENTS
import PageHeader from '../../components/PageHeader/PageHeader';
import Page from '../../components/Page/Page';

// CONTAINERS
import MonthExpansesTableContainer from './MonthExpansesTableContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthExpanses } from '../../redux/actions/monthExpansesActions';

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "הוצאות חודשיות";

const MonthExpanses = () => {

  const dispatch = useDispatch();

  const { buildingName, buildingId } = useLocation().state;
  const { date, data, isFetching } = useSelector(store => store.monthExpanses[buildingId]);

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.month !== "")
      dispatch(fetchMonthExpanses({ buildingId, date }));
  }, [dispatch, buildingId, date]);

  return (
    <Page>
      <PageHeader buildingName={buildingName} buildingId={buildingId} page={PAGE_TITLE} />

      <MonthExpansesTableContainer
        buildingName={buildingName}
        buildingId={buildingId}
        date={date}
        pageName={PAGE_NAME}
        pageTitle={PAGE_TITLE}
        data={data}
        isFetching={isFetching}
      />
    </Page>
  );
}

export default MonthExpanses;