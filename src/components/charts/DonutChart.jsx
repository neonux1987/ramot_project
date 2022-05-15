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
          fillColor: "#f5f5f5",
          showInLegend: false,
          innerSize: "80%",
          dataLabels: {
            enabled: false,
          },
          size: 140,
          enableMouseTracking: false,
          borderWidth: 0
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