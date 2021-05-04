const { ipcMain } = require('electron');
const { exportReports } = require('../backend/services/reportsSvc');
const { exportExcel } = require('../backend/services/excel/excelSvc');
const { exportChart } = require('../backend/services/highcharts/exporter');

const reportsIpc = () => {

  ipcMain.on('export-to-excel', (event, { buildingName, buildingNameEng, pageName, fileName, date, data }) => {
    exportExcel(buildingName, buildingNameEng, pageName, fileName, date, data).then((result) => {
      event.sender.send("excel-exported", { data: result });
    }).catch((error) => {
      event.reply("excel-exported", { error: error.message });
    });
  });

  ipcMain.on('export-reports', (event, { date, buildings }) => {
    exportReports(date, buildings).then((result) => {

      exportChart();
      event.sender.send("reports-exported", { data: result });
    }).catch((error) => {
      event.reply("reports-exported", { error: error.message });
    });
  });

}

module.exports = reportsIpc;