// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastManager } from '../../../toasts/toastManager';

// ACTIONS
import { fetchRegisteredYears } from '../../../redux/actions/registeredYearsActions';
import { updateDate, fetchTopIncomeOutcome } from '../../../redux/actions/topChartActions';

// COMPONENTS
import ChartWrapper from '../../../components/ChartWrapper/ChartWrapper';
import TableControls from '../../../components/table/TableControls/TableControls';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import BarChart from '../../../components/charts/BarChart';
import ChartSelectorNav from '../../../components/charts/ChartSelectorNav';
import SectionWithHeader from '../../../components/Section/SectionWithHeader';
import Tab from '../../../components/Tab/Tab';

const TopChartContainer = props => {
  //building name
  const { buildingNameEng, pageName } = props;

  const registeredYears = useSelector(store => store.registeredYears[buildingNameEng]);
  const { date, data, isFetching } = useSelector(store => store.topChart[buildingNameEng]);

  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchData = useCallback(() => {
    const params = {
      buildingNameEng,
      date: {
        fromYear: date.fromYear,
        toYear: date.toYear
      },
      limit: 10
    }

    return dispatch(fetchTopIncomeOutcome(params));
  }, [dispatch, buildingNameEng, date.fromYear, date.toYear]);

  const fetchAndPrepareData = useCallback(async () => {
    const promise = await fetchData(date);

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
          series: [
            {
              name: "הוצאות",
              data: outcomeData,
              color: "#30a3fc"
            }
          ]
        };
      })

    }

    setReady(() => true);
  }, [fetchData, date]);

  useEffect(() => {
    dispatch(fetchRegisteredYears({ buildingNameEng }));
  }, [dispatch, pageName, buildingNameEng]);


  // load on start the previous selected data
  useEffect(() => {
    if (date.fromYear !== "" && date.toYear !== "")
      fetchAndPrepareData();
  }, [date, fetchAndPrepareData]);

  const submit = (date) => {
    if (date.fromYear > date.toYear)
      toastManager.error("תאריך התחלה לא יכול להיות יותר גדול מתאריך סוף.");
    else {
      dispatch(updateDate(buildingNameEng, date));
    }
  }

  return <Tab>
    <TableControls
      withFullscreen={false}
      middlePane={<DateRangePicker
        years={registeredYears.data}
        date={date}
        submit={submit}
        loading={registeredYears.isFetching}
      />}
    />

    <ChartWrapper itemCount={data.length} isFetching={isFetching && !ready} >
      <BarChart
        title={`טופ 10 הוצאות מ- ${date.fromYear} עד- ${date.toYear}`}
        series={chartData.series}
        categories={chartData.labels}
      />
    </ChartWrapper>
  </Tab>

}

export default React.memo(TopChartContainer);