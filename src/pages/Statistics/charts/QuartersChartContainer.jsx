import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuartersStatsByYear } from "../../../redux/actions/quarterlyStatsActions";
import ChartWrapper from "../../../components/ChartWrapper/ChartWrapper";
import BarChart from "../../../components/charts/BarChart";
import { updateDate } from "../../../redux/actions/quartersChartActions";
import Tab from "../../../components/Tab/Tab";
import YearOnlyDatePicker from "../../../components/DatePicker/YearOnlyDatePicker";
import useIsMounted from "../../../customHooks/useIsMounted";
import { setPrintableComponentRef } from "../../../redux/actions/printActions";

const QuartersChartContainer = (props) => {
  //building name
  const { buildingId, buildingName, pageName } = props;

  const { isFetching, data } = useSelector(
    (store) => store.quarterlyStats[buildingId].pages[pageName]
  );
  const date = useSelector((store) => store.quartersChart[buildingId].date);

  const isMounted = useIsMounted();
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingId,
      pageName,
      date
    };

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
          datasets: [
            {
              label: "הוצאות",
              data: outcomeData,
              backgroundColor: "#30a3fc99",
              borderColor: "#30a3fc"
            },
            {
              label: "הכנסות",
              data: incomeData,
              backgroundColor: "#30e8aa99",
              borderColor: "#30e8aa"
            }
          ]
        };
      });
    }
  }, [fetchMonthsData]);

  useEffect(() => {
    if (date.year !== undefined && isMounted()) fetchAndPrepareData();

    return () => dispatch(setPrintableComponentRef(null));
  }, [dispatch, fetchAndPrepareData, date.year, isMounted]);

  return (
    <Tab>
      <YearOnlyDatePicker
        date={date}
        buildingId={buildingId}
        updateDate={updateDate}
        blackLabels={true}
      />

      <ChartWrapper itemCount={data.length} isFetching={isFetching}>
        <BarChart
          data={chartData}
          title={`${buildingName} - הוצאות והכנסות לשנת ${date.year}`}
        />
      </ChartWrapper>
    </Tab>
  );
};

export default QuartersChartContainer;
