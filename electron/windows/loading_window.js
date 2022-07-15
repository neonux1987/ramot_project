module.exports = (properties) => {
  const { BrowserWindow } = require("electron");

  let loadingWindow = new BrowserWindow({
    show: false,
    frame: false,
    resizeable: false,
    width: 320,
    height: 380,
    maxWidth: 320,
    maxHeight: 380,
    minWidth: 320,
    minHeight: 380,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    ...properties
  });
  loadingWindow.uniqueId = "loadingWindow";

  return loadingWindow;
};
