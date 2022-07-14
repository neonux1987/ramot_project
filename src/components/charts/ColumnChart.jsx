import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrintReady } from "../../redux/actions/printActions";
import ChartWithExporting from "./ChartWithExporting";
import { columnChart } from "../../helpers/chartsTemplates";

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
    const ele = chartRef.current.chart.renderer.box.cloneNode(true);
    const div = document.createElement("div");
    const chartSVG = chartRef.current.chart.getSVG({
      exporting: {
        allowHTML: true
      }
    });
    div.innerHTML = chartSVG;
    var svgData = new XMLSerializer().serializeToString(div);

    var img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," +
        window.btoa(decodeURIComponent(encodeURIComponent(svgData)))
    );
    setSvg(div);
  }, []);

  return (
    <>
      {svg !== null && (
        <div ref={(node) => node && node.appendChild(svg)}></div>
      )}
      <ChartWithExporting
        options={columnChart(title, series, categories)}
        chartRef={chartRef}
      />
    </>
  );
};

export default ColumnChart;
