import React from 'react';
import ChartWithExporting from './ChartWithExporting';
const { columnChart } = require('../../helpers/chartsTemplates');

const ColumnChart = ({ title = "", categories = [], series }) => {

  return <ChartWithExporting
    options={columnChart(title, series, categories)}
  />;

}

export default ColumnChart;