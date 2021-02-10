// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { css } from 'emotion';

// ACTIONS
import { fetchAllMonthsStatsByYear } from '../../redux/actions/monthlyStatsActions';

// COMPONENTS
import DatePicker from '../../components/DatePicker/DatePicker';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';

const container = css`
  margin: 15px 0;
`;

const chartContainer = css`
  /* max-width: 800px; */
  height: 550px;
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
              backgroundColor: 'rgba(25, 121, 204, 0.40)',
              order: 1
            },
            {
              label: "הוצאות",
              data: outcomeData,
              //backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              backgroundColor: 'rgba(241, 26, 95, 0.40)',
              order: 2
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

    <ChartWrapper itemCount={data.length} isFetching={isFetching} >
      <div className={chartContainer}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            //title: { text: `הכנסות והוצאות לפי חודשי שנה ${2020}`, display: true },
            tooltips: {
              rtl: true
            },
            layout: {
              padding: {
                left: 30,
                right: 30,
                top: 20,
                bottom: 20
              }
            },
            legend: {
              labels: {
                // This more specific font property overrides the global property
                fontColor: 'black',
                fontSize: 16
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize: 16,
                    fontFamily: "Open Sans Hebrew"
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    fontSize: 16,
                    fontFamily: "Open Sans Hebrew"
                  }
                }
              ]
            }
          }}
        />
      </div>
    </ChartWrapper>
  </div>

}