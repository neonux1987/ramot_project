const { ipcMain } = require('electron');

const reportsIpc = () => {

  ipcMain.on('export-to-excel', (event, { buildingName, buildingId, pageName, fileName, date, data }) => {
    const { exportExcel } = require('../backend/services/excel/excelSvc');

    exportExcel(buildingName, buildingId, pageName, fileName, date, data).then((result) => {
      event.sender.send("excel-exported", { data: result });
    }).catch((error) => {
      event.reply("excel-exported", { error: error.message });
    });
  });

  ipcMain.on('export-reports', (event, { date, buildings }) => {
    const { exportReports } = require('../backend/services/reportsSvc');

    exportReports(date, buildings).then((result) => {
      event.sender.send("reports-exported", { data: result });
    }).catch((error) => {
      event.reply("reports-exported", { error: error.message });
    });
  });

  ipcMain.on('export-chart', (event, params) => {
    const chartExporter = require('../backend/services/highcharts/exporter');

    chartExporter(params).then((result) => {
      event.sender.send("chart-exported", { data: result });
    }).catch((error) => {
      event.reply("chart-exported", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-reports', (event, params) => {
    const EmptyReportsGeneratorLogic = require('../backend/logic/EmptyReportsGeneratorLogic');
    const emptyReportsGeneratorLogic = new EmptyReportsGeneratorLogic();

    emptyReportsGeneratorLogic.generateEmptyReports(params).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("empty-reports-generated", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("empty-reports-generated", { error: error.message });
    });
  });

}

module.exports = reportsIpc;