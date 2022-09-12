import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastManager } from "../../../toasts/toastManager";
import { fetchRegisteredYears } from "../../../redux/actions/registeredYearsActions";
import {
  updateDate,
  fetchTopIncomeOutcome
} from "../../../redux/actions/topChartActions";
import ChartWrapper from "../../../components/ChartWrapper/ChartWrapper";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import Tab from "../../../components/Tab/Tab";
import HorizontalBarChart from "../../../components/charts/HorizontalBarChart";
import useIsMounted from "../../../customHooks/useIsMounted";

const TopChartContainer = (props) => {
  //building name
  const { buildingId, pageName } = props;

  const registeredYears = useSelector(
    (store) => store.registeredYears[buildingId]
  );
  const { date, data, isFetching } = useSelector(
    (store) => store.topChart[buildingId]
  );

  const [ready, setReady] = useState(false);

  const isMounted = useIsMounted();
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchData = useCallback(() => {
    const params = {
      buildingId,
      date: {
        fromYear: date.fromYear,
        toYear: date.toYear
      },
      limit: 10
    };

    return dispatch(fetchTopIncomeOutcome(params));
  }, [dispatch, buildingId, date.fromYear, date.toYear]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchData();

    if (promise !== undefined) {
      const labels = [];
      const outcomeData = [];

      promise.data.forEach((element) => {
        labels.push(element.section);
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
            }
          ]
        };
      });
    }

    setReady(() => true);
  }, [fetchData]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingId }));
  }, [dispatch, pageName, buildingId]);

  // load on start the previous selected data
  useEffect(() => {
    if (date.fromYear !== "" && date.toYear !== "" && isMounted())
      fetchAndPrepareData();
  }, [date, fetchAndPrepareData, isMounted]);

  const submit = (date) => {
    if (date.fromYear > date.toYear)
      toastManager.error("תאריך התחלה לא יכול להיות יותר גדול מתאריך סוף.");
    else {
      dispatch(updateDate(buildingId, date));
    }
  };

  return (
    <Tab>
      <DateRangePicker
        years={registeredYears.data}
        date={date}
        submit={submit}
        loading={registeredYears.isFetching}
      />

      <ChartWrapper itemCount={data.length} isFetching={isFetching && !ready}>
        <HorizontalBarChart
          title={`טופ 10 הוצאות מ- ${date.fromYear} עד- ${date.toYear}`}
          data={chartData}
        />
      </ChartWrapper>
    </Tab>
  );
};

export default React.memo(TopChartContainer);
