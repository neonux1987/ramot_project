import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import("highcharts/modules/exporting")(Highcharts);
import("highcharts/modules/offline-exporting")(Highcharts);

const ChartWithExporting = ({ chartRef, ...newProps }) => {
  return (
    <HighchartsReact highcharts={Highcharts} {...newProps} ref={chartRef} />
  );
};

export default ChartWithExporting;
