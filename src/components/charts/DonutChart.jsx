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
        width: 160,
        height: 160,
        backgroundColor: "transparent"
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        pie: {
          fillColor: "#f5f5f5",
          showInLegend: false,
          innerSize: "85%",
          dataLabels: {
            enabled: false,
          },
          size: 150,
          enableMouseTracking: false,
          borderWidth: 0
        }
      },
      title: {
        text: props.title,
        align: "center",
        verticalAlign: "middle",
        widthAdjust: 20,
        style: {
          fontSize: "24px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "500",
          width: "200px !important"
        },
        useHtml: true
      },
      series: props.series,
      tooltip: {
        enabled: false
      }
    }}
  />;

}

export default DonutChart;