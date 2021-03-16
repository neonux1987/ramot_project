// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';
import { toastManager } from '../../../toasts/toastManager';

// ACTIONS
import { fetchSummarizedBudgetsTopIncomeOutcome, summarizedBudgetsCleanup } from '../../../redux/actions/summarizedBudgetActions';
import { fetchRegisteredYears } from '../../../redux/actions/registeredYearsActions';
import { updateDate, fetchTopIncomeOutcome } from '../../../redux/actions/topChartActions';

// COMPONENTS
import ChartWrapper from '../../../components/ChartWrapper/ChartWrapper';
import TableControls from '../../../components/table/TableControls/TableControls';
import HorizontalColumnChart from '../../../components/charts/HorizontalColumnChart';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';


const container = css`
  margin: 15px 0;
`;

const TopChartContainer = props => {
  //building name
  const { buildingNameEng, pageName } = props;

  const registeredYears = useSelector(store => store.registeredYears[buildingNameEng]);
  const { date, data, isFetching } = useSelector(store => store.topChart[buildingNameEng]);

  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchData = useCallback((date) => {
    const params = {
      buildingNameEng,
      date: {
        fromYear: date.fromYear,
        toYear: date.toYear
      },
      limit: 10
    }

    return dispatch(fetchTopIncomeOutcome(params));
  }, [dispatch, buildingNameEng, date.fromYear, date.toYear]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchData(date);

    if (promise !== undefined) {
      const labels = [];
      const incomeData = [];
      const outcomeData = [];

      promise.data.forEach((element) => {
        labels.push(element.section);
        incomeData.push(element.income);
        outcomeData.push(element.outcome);
      });

      setChartData(() => {
        return {
          labels,
          series: [
            {
              data: outcomeData
            },
            {
              data: incomeData
            }
          ]
        };
      })

    }

    setReady(() => true);
  }, [fetchData, date]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [dispatch, pageName, buildingNameEng]);


  // load on start the previous selected data
  useEffect(() => {
    fetchAndPrepareData();
  }, [date]);

  const submit = (date) => {
    if (date.fromYear > date.toYear)
      toastManager.error("תאריך התחלה לא יכול להיות יותר גדול מתאריך סוף.");
    else {
      dispatch(updateDate(buildingNameEng, date));
    }
  }

  return <div className={container}>
    <TableControls
      middlePane={<DateRangePicker
        years={registeredYears.data}
        date={date}
        submit={submit}
        loading={registeredYears.isFetching}
      />}
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching || !ready} >
      <HorizontalColumnChart
        title={`טופ 10 סעיפים - (${date.fromYear}-${date.toYear})`}
        series={chartData.series}
        categories={chartData.labels}
      />
    </ChartWrapper>
  </div>

}

export default React.memo(TopChartContainer);