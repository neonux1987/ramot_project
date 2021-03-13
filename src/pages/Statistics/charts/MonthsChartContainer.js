// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

// ACTIONS
import { fetchAllMonthsStatsByYear } from '../../../redux/actions/monthlyStatsActions';

// COMPONENTS
import DatePicker from '../../../components/DatePicker/DatePicker';
import ChartWrapper from '../../../components/ChartWrapper/ChartWrapper';
import TableControls from '../../../components/table/TableControls/TableControls';
import ColumnChart from '../../../components/charts/ColumnChart';

const container = css`
  margin: 15px 0;
`;

const MonthsChartContainer = props => {
  //building name
  const { buildingNameEng, pageName, date } = props;

  const { isFetching, data } = useSelector(store => store.monthlyStats[buildingNameEng].pages[pageName]);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingName: buildingNameEng,
      pageName,
      year: date.year
    }
    return dispatch(fetchAllMonthsStatsByYear(params));
  }, [dispatch, buildingNameEng, pageName, date.year]);

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
          buildingNameEng={buildingNameEng}
          pageName={pageName}
        />}
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching} >
      <ColumnChart series={chartData.series} categories={chartData.labels} />
    </ChartWrapper>
  </div>

}

export default MonthsChartContainer;