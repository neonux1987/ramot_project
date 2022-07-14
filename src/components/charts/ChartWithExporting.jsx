import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/offline-exporting")(Highcharts);

const ChartWithExporting = ({ chartRef, ...newProps }) => {
  return (
    <HighchartsReact highcharts={Highcharts} {...newProps} ref={chartRef} />
  );
};

export default ChartWithExporting;
