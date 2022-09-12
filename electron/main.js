//========================= Libraries =========================//
require("v8-compile-cache");
require("dotenv").config();
const { app, powerMonitor } = require("electron");
const path = require("path");
const contextMenu = require("electron-context-menu");

const isDev = !app.isPackaged;

// programatic env variables
process.env.APP_ROOT_PATH = app.getAppPath();
process.env.NODE_ENV = isDev ? "development" : "production";

//========================= app =========================//
const createMainWindow = require("./windows/main_window");
const createLoadingWindow = require("./windows/loading_window");
const mainSystem = require("./backend/system/MainSystem");
const {
  AppErrorDialog,
  NoDBErrorDialog,
  checkIsNeedAdminRights
} = require("./helpers/utils");

contextMenu({
  prepend: () => [
    {
      role: "selectAll",
      label: "סמן הכל"
    },
    {
      role: "reload",
      label: "טען מחדש"
    }
  ],
  labels: {
    cut: "גזור",
    copy: "העתק",
    paste: "הדבק",
    save: "שמור",
    saveImageAs: "שמור תמונה",
    copyLink: "העתק קישור",
    copyImageAddress: "העתק קישור תמונה",
    inspect: "Inspect"
  }
});

//app details
const icon = path.join(app.getAppPath(), "Icon/ramot-group-icon.png");

let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

async function createWindow() {
  let loadingWindow = createLoadingWindow({ icon });

  loadingWindow.once("show", async () => {
    await checkIsNeedAdminRights();

    /* start system */
    mainSystem
      .startSystem()
      .then(() => {
        mainWindow = createMainWindow({ icon });

        //const ses = mainWindow.webContents.session;

        if (isDev) {
          // Open the DevTools.
          mainWindow.webContents.openDevTools();
          process.traceProcessWarnings = true;
        }

        mainWindow.on("closed", () => (mainWindow = null));

        mainWindow.webContents.on("new-window", (event) => {
          event.preventDefault();
        });

        mainWindow.webContents.once("dom-ready", () => {
          mainWindow.show();
          loadingWindow.hide();
          loadingWindow.destroy();
          loadingWindow = null;

          mainSystem.deleteBuildingsInQueueTask();
        });
        // long loading html
        mainWindow.loadURL(
          isDev
            ? "http://localhost:3000?view=AppView"
            : `file://${path.join(
                __dirname,
                "../build/index.html?view=AppView"
              )}`
        );

        powerMonitor.on("resume", () => {
          // we want to cover more ways to run up the task
          // of deleting buildings except the start of the app
          mainSystem.deleteBuildingsInQueueTask();
        });
      })
      .catch(async (error) => {
        if (
          error.message === "קובץ בסיס נתונים לא קיים" ||
          error.message === "המערכת נכשלה בהתחברות לבסיס הנתונים"
        ) {
          const { ipcMain } = require("electron");

          // in case of app data cache is deleted
          // and there's not database we want to get
          // the settings for restore wizard to
          // function in the renderer
          ipcMain.handleOnce("restore-get-settings", async () => {
            const SettingsLogic = require("./backend/logic/SettingsLogic");
            const settingsLogic = new SettingsLogic();

            return await settingsLogic.getSettings();
          });

          await NoDBErrorDialog();
        } else await AppErrorDialog();
      });
    /* end start system */
  });

  loadingWindow.loadURL(
    isDev
      ? "http://localhost:3000/?view=AppLoadingView"
      : `file://${path.join(
          __dirname,
          "../build/index.html?view=AppLoadingView"
        )}`
  );
  loadingWindow.show();
}

//-------------------------------------------------------------------
// Will quit if a there's an instance already running,
// otherwise create the instance
//-------------------------------------------------------------------
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on("ready", createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}
