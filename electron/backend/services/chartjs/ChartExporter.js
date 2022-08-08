async function exportCharts(reportsQueue) {
  const fse = require("fs-extra");
  const ServiceError = require("../../customErrors/ServiceError");
  const createChartExportWindow = require("../../../windows/chart_export_window");
  const { ipcMain } = require("electron");

  try {
    ipcMain.handleOnce("get-charts-data-to-export", () => {
      return reportsQueue;
    });

    ipcMain.removeAllListeners("charts-ready");
    ipcMain.once("charts-ready", (_, chartsData) => {
      console.log(chartsData);
    });

    const chartExportWindow = createChartExportWindow();

    /* if (chartData !== undefined) {
      for (let i = 0; i < chartData.length; i++) {
        await fse.writeFile(chartData[i].filePath, chartData[i].dataUrl);
      }
    } */
  } catch (error) {
    console.log(error);
    throw new ServiceError(
      "המערכת לא הצליחה לשמור את הגרף כתמונה",
      "ChartExporter.js",
      error
    );
  }
}

async function onChartsDataReady(ipcMain) {
  new Promise((resolve) => {
    ipcMain.handleOnce("charts-ready", (_, chartsData) => {
      console.log(chartData);
      resolve(chartsData);
    });
  });
}

module.exports = { exportCharts };
