import React from "react";
import { useSelector } from "react-redux";
import ChartWithExporting from "./ChartWithExporting";
const { columnChart } = require("../../helpers/chartsTemplates");

const ColumnChart = ({ title = "", categories = [], series }) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  return (
    <ChartWithExporting
      options={columnChart(title, series, categories, isFullscreen)}
    />
  );
};

export default ColumnChart;
