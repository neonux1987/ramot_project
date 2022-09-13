import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastManager } from "../../../toasts/toastManager";
import { fetchYearStatsByYearRange } from "../../../redux/actions/yearlyStatsActions";
import { fetchRegisteredYears } from "../../../redux/actions/registeredYearsActions";
import { updateDate } from "../../../redux/actions/yearsChartActions";
import ChartWrapper from "../../../components/ChartWrapper/ChartWrapper";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import Tab from "../../../components/Tab/Tab";
import BarChart from "../../../components/charts/BarChart";
import useIsMounted from "../../../customHooks/useIsMounted";
import { setPrintableComponentRef } from "../../../redux/actions/printActions";

const YearsChartContainer = (props) => {
  //building name
  const { buildingId, buildingName, pageName, setIsDataExist } = props;

  const { isFetching, data } = useSelector(
    (store) => store.yearlyStats[buildingId].pages[pageName]
  );
  const registeredYears = useSelector(
    (store) => store.registeredYears[buildingId]
  );
  const { date } = useSelector((store) => store.yearsChart[buildingId]);

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
      pageName,
      fromYear: date.fromYear,
      toYear: date.toYear
    };

    return dispatch(fetchYearStatsByYearRange(params));
  }, [dispatch, buildingId, pageName, date.fromYear, date.toYear]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchData();

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

    setReady(() => true);
  }, [fetchData]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingId }));
  }, [dispatch, pageName, buildingId]);

  // load on start the previous selected data
  useEffect(() => {
    if (date.fromYear !== "" && date.toYear !== "" && isMounted())
      fetchAndPrepareData();

    return () => dispatch(setPrintableComponentRef(null));
  }, [isMounted, fetchAndPrepareData, date, dispatch]);

  useEffect(() => {
    if (data.length > 0) setIsDataExist(true);

    return () => setIsDataExist(false);
  }, [data, setIsDataExist]);

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
        updateDate={updateDate}
        submit={submit}
        loading={registeredYears.isFetching}
      />

      <ChartWrapper itemCount={data.length} isFetching={isFetching && !ready}>
        <BarChart
          title={`${buildingName} - הוצאות והכנסות מ- ${date.fromYear} עד- ${date.toYear}`}
          data={chartData}
        />
      </ChartWrapper>
    </Tab>
  );
};

export default React.memo(YearsChartContainer);
