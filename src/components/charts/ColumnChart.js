import React from 'react';
import ChartWithExporting from './ChartWithExporting';
import { css } from 'emotion';

const menuClassName = css`
  direction: rtl;

  ul li {
    text-align: right;
  }
`;

const ColumnChart = ({ title = "", categories = [], series, options }) => {

  return <ChartWithExporting
    options={{
      chart: {
        type: "column",
        style: {
          fontFamily: "Assistant, sans-serif"
        },
        height: "450px"
      },
      legend: {
        rtl: true,
        reversed: true,
        title: {
          style: {
            fontWeight: "500",
            fontSize: "14px"
          }
        }
      },
      lang: {
        downloadCSV: `שמור כקובץ נתונים CSV`,
        downloadPNG: `שמור כתמונת PNG`,
        downloadPDF: `שמור כקובץ PDF`,
        printChart: `הדפס גרף`,
        viewFullscreen: `מסך מלא`,
        exitFullscreen: `יציאה ממסך מלא`
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            enabled: true,
            align: "left",
            menuClassName,
            menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadPDF"]
          }
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: title,
        style: {
          fontSize: "34px",
          fontWeight: "500",
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:14px;float: right;">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0;text-align: right;"><b>{point.y:.2f} ש"ח</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
        style: {
          direction: 'rtl',
          fontWeight: "500",
          fontSize: "14px"
        }
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            allowOverlap: true
          }
        }
      },
      yAxis: {
        opposite: true,
        title: {
          enabled: false
        },
        gridLineDashStyle: "dash",
        labels: {
          style: {
            fontSize: "14px"
          }
        }
      },
      xAxis: {
        categories,
        crosshair: true,
        labels: {
          style: {
            fontSize: "16px"
          }
        }
      },
      series
    }}
  />;

}

export default ColumnChart;