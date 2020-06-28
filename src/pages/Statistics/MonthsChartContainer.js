// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { css } from 'emotion';

// ACTIONS
import { fetchAllMonthsStatsByYear } from '../../redux/actions/monthlyStatsActions';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DatePicker from '../../components/DatePicker/DatePicker';

const container = css`
  margin: 15px 0;
`;

const chartContainer = css`
  /* max-width: 800px; */
  /* height: 400px; */
  background: #ffffff;
`;

export default props => {
  //building name
  const { buildingName, pageName, date } = props;

  const { isFetching, data } = useSelector(store => store.monthlyStats[buildingName].pages[pageName]);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({});

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingName,
      pageName,
      year: date.year
    }
    return dispatch(fetchAllMonthsStatsByYear(params));
  }, [dispatch, buildingName, pageName, date.year]);

  const fetchAndSetData = useCallback(async () => {
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
              label: "הכנסות",
              data: incomeData,
              //backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgb(25, 121, 204)'],
              borderWidth: 2,
              fill: false
            },
            {
              label: "הוצאות",
              data: outcomeData,
              //backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgb(241, 26, 95)'],
              borderWidth: 2,
              fill: false
            }
          ]
        };
      })

    }

  }, [fetchMonthsData]);

  useEffect(() => {
    if (date.year !== undefined)
      fetchAndSetData();
  }, [dispatch, fetchAndSetData, date.year]);


  return <div className={container}>
    <DatePicker
      date={date}
      buildingName={buildingName}
      pageName={pageName}
    />

    <div className={chartContainer}>
      {isFetching || data.length === 0 ?
        <AlignCenterMiddle className={container}>אין נתונים. בחר תאריך או צור דוחות חדשים.</AlignCenterMiddle>
        :
        <Line data={chartData} options={{
          responsive: true,
          title: { text: `הכנסות והוצאות לפי חודשי שנה ${2020}`, display: true },
          tooltips: {
            rtl: true
          }
        }} />
      }
    </div>
  </div>

}