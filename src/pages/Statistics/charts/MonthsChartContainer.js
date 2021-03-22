// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

// ACTIONS
import { fetchAllMonthsStatsByYear } from '../../../redux/actions/monthlyStatsActions';

// COMPONENTS
import ChartWrapper from '../../../components/ChartWrapper/ChartWrapper';
import TableControls from '../../../components/table/TableControls/TableControls';
import ColumnChart from '../../../components/charts/ColumnChart';

// HOOKS
import { updateDate } from '../../../redux/actions/monthsChartAction';
import YearOnlyDatePicker from '../../../components/DatePicker/YearOnlyDatePicker';

const container = css`
  margin: 15px 0;
`;

const MonthsChartContainer = props => {
  //building name
  const { buildingNameEng, pageName } = props;

  const { isFetching, data } = useSelector(store => store.monthlyStats[buildingNameEng].pages[pageName]);
  const date = useSelector(store => store.monthsChart[buildingNameEng].date);

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
              data: outcomeData,
              color: "#30a3fc"
            },
            {
              name: "הכנסות",
              data: incomeData,
              color: "#30e8aa"
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
        <YearOnlyDatePicker
          date={date}
          buildingNameEng={buildingNameEng}
          updateDate={updateDate}
        />
      }
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching} >
      <ColumnChart
        title={date.year}
        series={chartData.series}
        categories={chartData.labels}
      />
    </ChartWrapper>
  </div >

}

export default MonthsChartContainer;