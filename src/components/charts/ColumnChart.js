import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = ({ categories = [], series, options }) => {

  return <ReactApexChart options={{
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
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          }
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
      width: 1
    },
    legend: {
      show: true,
      fontSize: "16px",
      fontWeight: 400,
      position: 'bottom',
      offsetY: 0,
      inverseOrder: true,
      horizontalAlign: "center",
      onItemHover: {
        highlightDataSeries: false
      }
    },
    xaxis: {
      categories: categories,
      tickPlacement: 'on',
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
          show: false,
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
    grid: {
      strokeDashArray: 3
    },
    tooltip: {
      followCursor: true
    },
    ...options
  }}
    series={series}
    type="bar"
    height={450}
  />

}

export default ColumnChart;