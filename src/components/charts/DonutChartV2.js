import React from 'react';
import Chart from './Chart';

const DonutChartV2 = props => {

  return <Chart
    options={{
      credits: {
        enabled: false
      },
      chart: {
        type: "pie",
        width: 150,
        height: 150
      },
      plotOptions: {
        pie: {
          showInLegend: false,
          innerSize: "60%",
          dataLabels: {
            enabled: false,
          },
          size: 120
        }
      },
      title: {
        text: ""
      },
      series: props.series,
      tooltip: {
        useHtml: true,
        pointFormat: '<div>' +
          '<span style="color: {point.color};width: 18px;height: 18px;"></span>' +
          '<span> {point.y}</span>' +
          '</div>'
      }
    }}
  />;

}

export default DonutChartV2;