import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrintReady } from "../../redux/actions/printActions";
import ChartWithExporting from "./ChartWithExporting";
const { columnChart } = require("../../helpers/chartsTemplates");

const ColumnChart = ({ title = "", categories = [], series }) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const printMode = useSelector((store) => store.print.printMode);
  const chartRef = useRef();
  const dispatch = useDispatch();
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    if (chartRef.current.container.current) {
      chartRef.current.container.current.style.setProperty(
        "height",
        isFullscreen ? "calc(100vh - 224px)" : "500px"
      );
      chartRef.current.chart.reflow();
    }
  }, [isFullscreen]);

  useEffect(() => {
    setSvg(chartRef.current.container.current.children[0].children[0]);
  }, []);

  return (
    <>
      <ChartWithExporting
        options={columnChart(title, series, categories)}
        chartRef={chartRef}
      />
    </>
  );
};

export default ColumnChart;
