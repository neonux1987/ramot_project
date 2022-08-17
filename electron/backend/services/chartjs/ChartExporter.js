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
        const base64Data = resultData[i].dataUrl.replace(
          "data:image/png;base64,",
          ""
        );

        await fse.writeFile(resultData[i].filePath, base64Data, "base64");
      }
    }

    chartExportWindow.destroy();
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
