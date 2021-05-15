// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { fetchAllQuartersStatsByYear } from '../../../redux/actions/quarterlyStatsActions';

// COMPONENTS
import ChartWrapper from '../../../components/ChartWrapper/ChartWrapper';
import TableControls from '../../../components/table/TableControls/TableControls';
import ColumnChart from '../../../components/charts/ColumnChart';
import { updateDate } from '../../../redux/actions/quartersChartActions';
import YearOnlyDatePicker from '../../../components/DatePicker/YearOnlyDatePicker';
import Tab from '../../../components/Tab/Tab';

const QuartersChartContainer = props => {
  //building name
  const { buildingId, pageName } = props;

  const { isFetching, data } = useSelector(store => store.quarterlyStats[buildingId].pages[pageName]);
  const date = useSelector(store => store.quartersChart[buildingId].date);
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingName: buildingId,
      pageName,
      date
    }

    return dispatch(fetchAllQuartersStatsByYear(params));
  }, [dispatch, buildingId, pageName, date]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchMonthsData();

    if (promise !== undefined) {

      const labels = [];
      const incomeData = [];
      const outcomeData = [];

      promise.data.forEach((element) => {
        labels.push(`רבעון ${element.quarter}`);
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

  return <Tab>
    <TableControls
      withFullscreen={false}
      middlePane={
        <YearOnlyDatePicker
          date={date}
          buildingId={buildingId}
          updateDate={updateDate}
          blackLabels={true}
        />}
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching} >
      <ColumnChart
        title={date.year}
        series={chartData.series}
        categories={chartData.labels}
      />
    </ChartWrapper>
  </Tab>

}

export default QuartersChartContainer;