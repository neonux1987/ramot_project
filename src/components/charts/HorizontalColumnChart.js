import React from 'react';
import ColumnChart from './ColumnChart';

const HorizontalColumnChart = ({ title = "", categories = [], series }) => {

  return <ColumnChart
    title={title}
    categories={categories}
    series={series}
    options={{
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      yaxis: [
        {
          show: true,
          opposite: true,
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: '#555555',
          },
          labels: {
            style: {
              fontSize: "16px",
              fontWeight: "500"
            },
            offsetX: 30,
            align: "left"
          },
          reversed: true
        }
      ],
      xaxis: {
        categories: categories,
        tickPlacement: 'on',
        labels: {
          style: {
            fontSize: "16px",
            fontWeight: "500"
          }
        }
      }
    }}
    height="auto"
  />;

}

export default HorizontalColumnChart;