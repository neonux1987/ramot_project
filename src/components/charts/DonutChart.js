import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({ labels = [], series, options, width = "130px" }) => {

  return <ReactApexChart
    options={{
      chart: {
        type: 'donut',
        fontFamily: "Assistant, sans-serif"
      },
      labels: labels,
      plotOptions: {
        pie: {
          donut: {
            value: {
              show: true
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        fontSize: "16px",
        fontWeight: 500,
        show: false
      },
      responsive: [{
        breakpoint: 1400,
        options: {
          chart: {
            width: 140,
            height: 140
          },
          legend: {
            position: 'right'
          }
        }
      }],
      tooltip: {
        enabled: true,
        onDatasetHover: {
          highlightDataSeries: false,
        },
      },
      ...options
    }}
    series={series}
    type="donut"
    width={width}
    height="130px"
  />

}

export default DonutChart;