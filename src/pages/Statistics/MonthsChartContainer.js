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
import ReactApexChart from 'react-apexcharts';
import TableControls from '../../components/table/TableControls/TableControls';

const container = css`
  margin: 15px 0;
`;

const chartContainer = css`
  /* max-width: 800px; */
  height: 550px;
  background: #ffffff;
  /* box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); */
  border-radius: 3px;
`;

export default props => {
  //building name
  const { buildingName, pageName, date } = props;

  const { isFetching, data } = useSelector(store => store.monthlyStats[buildingName].pages[pageName]);

  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    series: []
  });

  const fetchMonthsData = useCallback(() => {
    const params = {
      buildingName,
      pageName,
      year: date.year
    }
    return dispatch(fetchAllMonthsStatsByYear(params));
  }, [dispatch, buildingName, pageName, date.year]);

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
              data: outcomeData
            },
            {
              name: "הכנסות",
              data: incomeData
            }
          ]
        };
      })

    }

    setReady(() => true);
  }, [fetchMonthsData]);

  useEffect(() => {
    if (date.year !== undefined)
      fetchAndPrepareData();
  }, [dispatch, fetchAndPrepareData, date.year]);

  return <div className={container}>

    <TableControls
      middlePane={
        <DatePicker
          date={date}
          buildingName={buildingName}
          pageName={pageName}
        />}
    />



    <ChartWrapper itemCount={data.length} isFetching={isFetching || !ready} >
      <div className={chartContainer}>

        <ReactApexChart options={{
          chart: {
            height: 450,
            type: 'bar',
            stacked: false,
            fontFamily: "Assistant, sans-serif",
            toolbar: {
              show: true,
              offsetY: -10,
              offsetX: 0,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
              }
            },
            defaultLocale: 'he',
            locales: [{
              name: 'he',
              options: {
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                toolbar: {
                  download: 'הורד SVG',
                  selection: 'בחירה',
                  selectionZoom: 'בחירת זום',
                  zoomIn: 'זום לבפנים',
                  zoomOut: 'זום לבחוץ',
                  pan: 'הזזה',
                  reset: 'אתחול זום',
                }
              }
            }]
          },
          //colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
          dataLabels: {
            enabled: true,
            background: {
              enabled: true,
              foreColor: '#555',
              padding: 2,
              borderRadius: 0,
              borderWidth: 1,
              borderColor: '#efecec',
              opacity: 0.9,
              dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.45
              }
            }
          },
          stroke: {
            width: [1, 1]
          },
          legend: {
            show: true,
            fontSize: "16px",
            fontWeight: 400,
            position: 'left',
            offsetY: 0,
            inverseOrder: true,
            horizontalAlign: "center",
            onItemHover: {
              highlightDataSeries: false
            }
          },
          xaxis: {
            categories: chartData.labels,
            labels: {
              style: {
                fontSize: "16px",
                fontWeight: "500"
              }
            }
          },
          yaxis: [
            {
              show: true,
              opposite: true,
              axisTicks: {
                show: true
              },
              tickAmount: 6,
              axisBorder: {
                show: true,
                color: '#555555',
              },
              labels: {
                style: {
                  colors: '#555555',
                  fontSize: '16px',
                  fontWeight: 400
                },
                align: 'center'
              }
            }
          ],
          tooltip: {
            followCursor: true
          }
        }
        } series={chartData.series} type="bar" height={450} />

      </div>
    </ChartWrapper>
  </div>

}