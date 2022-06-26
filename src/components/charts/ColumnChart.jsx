import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChartWithExporting from "./ChartWithExporting";
const { columnChart } = require("../../helpers/chartsTemplates");

const ColumnChart = ({ title = "", categories = [], series }) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const chartRef = useRef();

  useEffect(() => {
    //if (isFullscreen) chartRef.current.chart.setSize(null, "calc(100vh-400px)");
    //console.log(chartRef.current.container.current.clientHeight);
    chartRef.current.chart.reflow();
  }, [isFullscreen]);

  return (
    <ChartWithExporting
      options={columnChart(title, series, categories)}
      chartRef={chartRef}
    />
  );
};

export default ColumnChart;
