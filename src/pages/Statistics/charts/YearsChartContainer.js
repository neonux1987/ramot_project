// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

// ACTIONS
import { fetchYearStatsByYearRange } from '../../../redux/actions/yearlyStatsActions';

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
  const { buildingName, pageName, date } = props;

  const currentDate = new Date();

  const { isFetching, data } = useSelector(store => store.yearlyStats[buildingName].pages[pageName]);

  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingName,
      pageName,
      fromYear: currentDate.getFullYear() - 9, // 10 years of data only
      toYear: currentDate.getFullYear() + 1
    }

    return dispatch(fetchYearStatsByYearRange(params));
  }, [dispatch, buildingName, pageName, date.year]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchMonthsData();

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
  }, [fetchMonthsData]);

  useEffect(() => {
    fetchAndPrepareData();
  }, [dispatch, fetchAndPrepareData]);

  return <div className={container}>
    <TableControls
      middlePane={<DateRangePicker pageName={pageName} buildingName={buildingName} date={date} />}
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching || !ready} >
      <ColumnChart series={chartData.series} categories={chartData.labels} />
    </ChartWrapper>
  </div>

}

export default YearsChartContainer;