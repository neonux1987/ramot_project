async function exportCharts(reportsQueue) {
  const fse = require("fs-extra");
  const ServiceError = require("../../customErrors/ServiceError");
  const createChartExportWindow = require("../../../windows/chart_export_window");
  const { ipcMain } = require("electron");

  try {
    ipcMain.handleOnce("get-charts-data-for-export", () => {
      return reportsQueue;
    });

    const promise = new Promise((resolve) => {
      ipcMain.once("charts-ready", (_, chartsData) => {
        resolve(chartsData);
      });
    });

    const chartExportWindow = await createChartExportWindow();

    const resultData = await promise;

    if (resultData !== undefined) {
      for (let i = 0; i < resultData.length; i++) {
        let base64data = new Buffer.from(resultData[i].dataUrl);
        console.log(base64data);
        await fse.writeFile(resultData[i].filePath, base64data);
      }
    }

    //chartExportWindow.destroy();
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
