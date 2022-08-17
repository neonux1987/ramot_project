module.exports = async (properties) => {
  const { BrowserWindow } = require("electron");
  const path = require("path");
  const isDev = process.env.NODE_ENV === "development";

  const chartExportWindow = new BrowserWindow({
    title: "ייצוא דוחות אקסל",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      webSecurity: false
    },
    frame: false,
    resizeable: false,
    show: false,
    ...properties
  });

  chartExportWindow.uniqueId = "chartExportWindow";

  chartExportWindow.loadURL(
    isDev
      ? "http://localhost:3000/?view=ChartExportView"
      : `file://${path.join(
          __dirname,
          "../../build/index.html?view=ChartExportView"
        )}`
  );

  return chartExportWindow;
};
