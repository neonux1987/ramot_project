module.exports = (properties) => {
  const { BrowserWindow } = require("electron");
  const path = require("path");
  const isDev = process.env.NODE_ENV === "development";

  const chartExportWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    title: "מערכת ניהול דוחות" + " - " + "NDT Solutions",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      webSecurity: false
    },
    frame: false,
    resizeable: false,
    show: true,
    ...properties
  });

  chartExportWindow.uniqueId = "chartExportWindow";

  chartExportWindow.loadURL(
    isDev
      ? "http://localhost:3000/?view=ChartExportView"
      : `file://${path.join(
          __dirname,
          "../build/index.html?view=ChartExportView"
        )}`
  );

  return chartExportWindow;
};
