import { ipcRenderer } from "electron";

export const exportChart = (options = {}) => {

  const highcharts = require('highcharts');
  require('highcharts/modules/exporting')(highcharts);
  require('highcharts/modules/offline-exporting')(highcharts);
  console.log(highcharts);
};