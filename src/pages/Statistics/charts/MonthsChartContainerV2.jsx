// LIBRARIES
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// ACTIONS
import { fetchAllMonthsStatsByYear } from "../../../redux/actions/monthlyStatsActions";

// COMPONENTS
import ChartWrapper from "../../../components/ChartWrapper/ChartWrapper";
import ColumnChart from "../../../components/charts/ColumnChart";

// HOOKS
import { updateDate } from "../../../redux/actions/monthsChartAction";
import YearOnlyDatePicker from "../../../components/DatePicker/YearOnlyDatePicker";
import Tab from "../../../components/Tab/Tab";
import ColumnChartV2 from "../../../components/charts/ColumnChartV2";

const MonthsChartContainerV2 = (props) => {
  //building name
  const { buildingId, pageName } = props;

  const { isFetching, data } = useSelector(
    (store) => store.monthlyStats[buildingId].pages[pageName]
  );
  const date = useSelector((store) => store.monthsChart[buildingId].date);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingId,
      pageName,
      year: date.year
    };
    return dispatch(fetchAllMonthsStatsByYear(params));
  }, [dispatch, buildingId, pageName, date.year]);

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
          datasets: [
            {
              label: "הוצאות",
              data: outcomeData,
              backgroundColor: "#30a3fc"
            },
            {
              label: "הכנסות",
              data: incomeData,
              backgroundColor: "#30e8aa"
            }
          ]
        };
      });
    }
  }, [fetchMonthsData]);

  useEffect(() => {
    if (date.year !== undefined) fetchAndPrepareData();
  }, [dispatch, fetchAndPrepareData, date.year]);

  return (
    <Tab>
      <YearOnlyDatePicker
        date={date}
        buildingId={buildingId}
        updateDate={updateDate}
        blackLabels={true}
      />

      <ChartWrapper
        itemCount={data.length}
        isFetching={isFetching || chartData.datasets.length === 0}
      >
        <ColumnChartV2 data={chartData} />
      </ChartWrapper>
    </Tab>
  );
};

export default MonthsChartContainerV2;
