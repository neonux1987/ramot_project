import React from 'react';
import Chart from './Chart';

const DonutChart = props => {

  return <Chart
    options={{
      credits: {
        enabled: false
      },
      chart: {
        type: "pie",
        width: 150,
        height: 150,
        backgroundColor: "transparent"
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        pie: {
          fillColor: "#eee",
          showInLegend: false,
          innerSize: "60%",
          dataLabels: {
            enabled: false,
          },
          size: 120,
          enableMouseTracking: false
        }
      },
      title: {
        text: ""
      },
      series: props.series,
      tooltip: {
        enabled: false
      }
    }}
  />;

}

export default DonutChart;