import React from 'react';
import ChartWithExporting from './ChartWithExporting';
import { columnChart } from './templates';

const ColumnChart = ({ title = "", categories = [], series }) => {

  return <ChartWithExporting
    options={columnChart(title, series, categories)}
  />;

}

export default ColumnChart;