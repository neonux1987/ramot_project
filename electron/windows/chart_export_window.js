const logManager = require("../backend/logger/LogManager");

module.exports = async (properties) => {
  const { BrowserWindow } = require("electron");
  const path = require("path");
  const isDev = process.env.NODE_ENV === "development";

  const chartExportWindow = new BrowserWindow({
    title: "מערכת ניהול דוחות" + " - " + "NDT Solutions",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      webSecurity: false
    },
    width: 1280,
    height: 720,
    frame: false,
    resizeable: true,
    show: true,
    ...properties
  });

  chartExportWindow.uniqueId = "chartExportWindow";
  const logger = logManager.getLogger();
  logger.info(
    `file://${path.join(__dirname, "../build/index.html?view=ChartExportView")}`
  );
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
