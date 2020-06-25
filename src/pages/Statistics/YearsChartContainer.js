// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { css } from 'emotion';

// ACTIONS
import { fetchYearStatsByYearRange } from '../../redux/actions/yearlyStatsActions';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

const container = css`
  max-width: 800px;
  height: 400px;
  background: #ffffff;
`;

export default props => {
  //building name
  const { buildingName, pageName } = props;

  const { isFetching, data } = useSelector(store => store.yearlyStats[buildingName].pages[pageName]);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({});

  const fetchYearsData = useCallback(() => {
    const params = {
      buildingName: buildingName,
      pageName,
      fromYear: 2018,
      toYear: 2020
    }
    return dispatch(fetchYearStatsByYearRange(params));
  }, [dispatch, buildingName, pageName]);

  const fetchAndSetData = useCallback(async () => {
    const promise = await fetchYearsData();

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

  }, [fetchYearsData]);

  useEffect(() => {
    fetchAndSetData();
  }, [dispatch, fetchAndSetData]);

  if (isFetching || data.length === 0)
    return <AlignCenterMiddle className={container}><Spinner loadingText={"טוען נתונים"} /></AlignCenterMiddle>;

  return (
    <div className={container}>
      <Line data={chartData} options={{
        responsive: true,
        title: { text: "הכנסות והוצאות לפי שנים", display: true },
        tooltips: {
          rtl: true
        }
      }} />
    </div>
  );

}