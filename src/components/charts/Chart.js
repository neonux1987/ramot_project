import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = props => {

  return <HighchartsReact
    highcharts={Highcharts}
    {...props}
  />;

}

export default Chart;