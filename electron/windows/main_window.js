module.exports = (properties) => {
  const { BrowserWindow } = require("electron");

  const mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    title: "מערכת ניהול דוחות" + " - " + "NDT Solutions",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    },
    frame: false,
    resizeable: false,
    show: false,
    ...properties
  });

  mainWindow.uniqueId = "mainWindow";

  return mainWindow;
};
