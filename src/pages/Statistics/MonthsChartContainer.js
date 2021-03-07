// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { css } from 'emotion';

// ACTIONS
import { fetchAllMonthsStatsByYear } from '../../redux/actions/monthlyStatsActions';

// COMPONENTS
import DatePicker from '../../components/DatePicker/DatePicker';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';
import ReactApexChart from 'react-apexcharts';
import TableControls from '../../components/table/TableControls/TableControls';
import ColumnChart from '../../components/charts/ColumnChart';

const container = css`
  margin: 15px 0;
`;

const chartContainer = css`
  /* max-width: 800px; */
  height: 550px;
  background: #ffffff;
  /* box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); */
  border-radius: 3px;
`;

export default props => {
  //building name
  const { buildingName, pageName, date } = props;

  const { isFetching, data } = useSelector(store => store.monthlyStats[buildingName].pages[pageName]);

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
      year: date.year
    }
    return dispatch(fetchAllMonthsStatsByYear(params));
  }, [dispatch, buildingName, pageName, date.year]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchMonthsData();

    if (promise !== undefined) {

      const labels = [];
      const incomeData = [];
      const outcomeData = [];

      promise.data.forEach((element) => {
        labels.push(element.month);
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
    if (date.year !== undefined)
      fetchAndPrepareData();
  }, [dispatch, fetchAndPrepareData, date.year]);

  return <div className={container}>

    <TableControls
      middlePane={
        <DatePicker
          date={date}
          buildingName={buildingName}
          pageName={pageName}
        />}
    />



    <ChartWrapper itemCount={data.length} isFetching={isFetching || !ready} >
      <div className={chartContainer}>

        <ColumnChart series={chartData.series} categories={chartData.labels} />

      </div>
    </ChartWrapper>
  </div>

}