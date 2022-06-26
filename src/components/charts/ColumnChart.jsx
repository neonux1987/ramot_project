import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChartWithExporting from "./ChartWithExporting";
const { columnChart } = require("../../helpers/chartsTemplates");

const ColumnChart = ({ title = "", categories = [], series }) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current.container.current) {
      chartRef.current.container.current.style.setProperty(
        "height",
        isFullscreen ? "calc(100vh - 224px)" : "500px"
      );
      chartRef.current.chart.reflow();
    }
  }, [isFullscreen]);

  return (
    <ChartWithExporting
      options={columnChart(title, series, categories)}
      chartRef={chartRef}
    />
  );
};

export default ColumnChart;
