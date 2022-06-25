import { css } from "emotion";

const menuClassName = css`
  direction: rtl;

  ul li {
    text-align: right;
  }
`;

export const columnChart = (title, series, categories, isFullscreen) => ({
  chart: {
    type: "column",
    style: {
      fontFamily: "Open Sans, sans-serif"
    },
    events: {
      render: (highcharts) => {
        /* highcharts.target.container.style.height = isFullscreen
          ? "1050px"
          : "450px";
        highcharts.target.chartHeight = isFullscreen ? 1050 : 450;
        highcharts.target.containerHeight = isFullscreen ? "1050px" : "450px"; */
        //console.log(highcharts.target);
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
    fallbackToExportServer: false,
    sourceWidth: 1280,
    sourceHeight: 720,
    buttons: {
      contextButton: {
        enabled: true,
        align: "left",
        menuClassName,
        menuItems: [
          "viewFullscreen",
          "printChart",
          "separator",
          "downloadPNG",
          "downloadPDF"
        ]
      }
    }
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
  credits: {
    enabled: false
  },
  title: {
    text: title,
    style: {
      fontSize: "34px",
      fontWeight: "500"
    }
  },
  tooltip: {
    headerFormat:
      '<span style="font-size:14px;float: right;">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0;text-align: right;"><b>{point.y:.2f} ש"ח</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
    style: {
      direction: "rtl",
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
  series,
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 1400
        },
        chartOptions: {
          chart: {
            height: "1050px"
          }
        }
      }
    ]
  }
});
