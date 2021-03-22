import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/exporting")(Highcharts);

const ChartWithExporting = props => {

  return <HighchartsReact
    highcharts={Highcharts}
    {...props}
  />;

}

export default ChartWithExporting;