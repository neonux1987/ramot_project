// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';
import { toastManager } from '../../../toasts/toastManager';

// ACTIONS
import { fetchYearStatsByYearRange } from '../../../redux/actions/yearlyStatsActions';
import { fetchRegisteredYears } from '../../../redux/actions/registeredYearsActions';
import { updateDate } from '../../../redux/actions/yearsChartActions';

// COMPONENTS
import ChartWrapper from '../../../components/ChartWrapper/ChartWrapper';
import TableControls from '../../../components/table/TableControls/TableControls';
import ColumnChart from '../../../components/charts/ColumnChart';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';

const container = css`
  margin: 15px 0;
`;

const YearsChartContainer = props => {
  //building name
  const { buildingNameEng, pageName } = props;

  const { isFetching, data } = useSelector(store => store.yearlyStats[buildingNameEng].pages[pageName]);
  const registeredYears = useSelector(store => store.registeredYears[buildingNameEng]);
  const { date } = useSelector(store => store.yearsChart[buildingNameEng]);

  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchData = useCallback((date) => {
    const params = {
      buildingName: buildingNameEng,
      pageName,
      fromYear: date.fromYear,
      toYear: date.toYear
    }

    return dispatch(fetchYearStatsByYearRange(params));
  }, [dispatch, buildingNameEng, pageName, date.year]);

  const fetchAndPrepareData = useCallback(async (date) => {
    const promise = await fetchData(date);

    if (promise !== undefined) {

      const labels = [];
      const incomeData = [];
      const outcomeData = [];

      promise.data.forEach((element) => {
        labels.push(element.year);
        incomeData.push(element.income);
        outcomeData.push(element.outcome);
      });

      setChartData(() => {
        return {
          labels,
          series: [
            {
              name: "הוצאות",
              data: outcomeData
            },
            {
              name: "הכנסות",
              data: incomeData
            }
          ]
        };
      })

    }

    setReady(() => true);
  }, [fetchData]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [dispatch, pageName, buildingNameEng]);


  // load on start the previous selected data
  useEffect(() => {
    fetchAndPrepareData(date)
  }, []);

  const submit = (date) => {
    if (date.fromYear > date.toYear)
      toastManager.error("תאריך התחלה לא יכול להיות יותר גדול מתאריך סוף.");
    else {
      dispatch(updateDate(buildingNameEng, date));
      fetchAndPrepareData(date);
    }
  }

  if (registeredYears.isFetching || date === undefined)
    return <div>yes</div>

  return <div className={container}>
    <TableControls
      middlePane={<DateRangePicker
        years={registeredYears.data}
        date={date}
        submit={submit}
      />}
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching || !ready} >
      <ColumnChart series={chartData.series} categories={chartData.labels} />
    </ChartWrapper>
  </div>

}

export default React.memo(YearsChartContainer);