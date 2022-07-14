const { ipcMain, shell, app, BrowserWindow, dialog } = require("electron");
const MainProcessLogic = require("../backend/logic/MainProcessLogic");
const LoggerError = require("../backend/customErrors/LoggerError");
const { AppErrorDialog } = require("../helpers/utils");

const mainProcessIpc = () => {
  const mainProcessLogic = new MainProcessLogic();
  const logger = require("../backend/logger/LogManager").getLogger();

  ipcMain.on("set-global-variable", (event, { key, value }) => {
    global.sharedObject[key] = value;
  });

  ipcMain.on("quit-app", (event) => {
    mainProcessLogic.quit();
  });

  ipcMain.on("restart-app", (event) => {
    try {
      mainProcessLogic.restart();
    } catch (error) {
      event.reply("app-restarted", { error: error.message });
    }
  });

  ipcMain.on("refresh-renderer", (event) => {
    event.reply("refresh");
  });

  process.on("uncaughtException", async (error, origin) => {
    const fs = require("fs");

    const loggerError = new LoggerError({
      name: "MainProcess",
      message: "קרתה תקלה לא ידועה",
      originalError: error
    });
    logger.error(loggerError.toString());

    AppErrorDialog();

    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${error}\n` + `Exception origin: ${origin}`
    );
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
    // Application specific logging, throwing an error, or other logic here
  });

  ipcMain.on("show-item-in-folder", (event, path) => {
    shell.showItemInFolder(path);
  });

  ipcMain.on("open-item", (_, path, ensure = false) => {
    if (ensure) {
      const fse = require("fs-extra");
      fse.ensureDir(path);
    }
    shell.openPath(path);
  });

  ipcMain.handle("get-app-info", () => {
    return {
      appVersion: app.getVersion(),
      appName: app.getName()
    };
  });

  ipcMain.handle("get-dialog", () => {
    return dialog;
  });

  ipcMain.handle("get-focused-window", () => {
    return BrowserWindow.getFocusedWindow();
  });

  ipcMain.handle("get-focused-window-webContents", () => {
    return BrowserWindow.getFocusedWindow().webContents;
  });

  ipcMain.handle("minimize-window", () => {
    const window = BrowserWindow.getFocusedWindow();
    window.minimize();
  });

  ipcMain.handle("maximize-window", () => {
    const window = BrowserWindow.getFocusedWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  });
};

module.exports = mainProcessIpc;
