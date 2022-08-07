async function exportCharts(reportsQueue) {
  const fse = require("fs-extra");
  const ServiceError = require("../../customErrors/ServiceError");
  const createChartExportWindow = require("../../../windows/chart_export_window");
  const { ipcMain } = require("electron");

  try {
    ipcMain.handleOnce("get-charts-data-to-export", () => {
      return reportsQueue;
    });

    const chartExportWindow = createChartExportWindow();

    const chartData = new Promise((resolve) => {
      /* chartExportWindow.once("charts-ready", (_, chartsData) => {
        resolve(chartsData);
      }); */
    });

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

module.exports = { exportCharts };
