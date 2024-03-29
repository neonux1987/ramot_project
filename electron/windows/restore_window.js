module.exports = () => {
  const { BrowserWindow, app } = require("electron");
  const path = require("path");
  const icon = path.join(app.getAppPath(), "Icon/ramot-group-icon.png");
  const isDev = process.env.NODE_ENV === "development";

  const restoreDbWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    title: "אשף שיחזור בסיס נתונים",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      webSecurity: false,
      preload: path.join(
        __dirname,
        "../preload_scripts",
        "restore_window.preload.js"
      )
    },
    backgroundColor: "#eee",
    icon,
    resizeable: false,
    show: false
  });

  restoreDbWindow.loadURL(
    isDev
      ? "http://localhost:3000/?view=RestoreWizardView"
      : `file://${path.join(
          __dirname,
          "../../build/index.html?view=RestoreWizardView"
        )}`
  );
  restoreDbWindow.show();
};
