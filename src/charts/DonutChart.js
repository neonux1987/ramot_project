import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({ series }) => {

  return <ReactApexChart
    options={{
      chart: {
        type: 'donut'
      },
      responsive: [{
        breakpoint: 1400,
        options: {
          chart: {
            width: 220
          },
          legend: {
            position: 'right'
          }
        }
      }]
    }}
    series={series}
    type="donut"
    width="260px"
  />

}

export default DonutChart;