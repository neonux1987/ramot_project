//========================= electron imports =========================//
const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
const { autoUpdater } = require('electron-updater');

//========================= services =========================//
const rendererotificationSvc = require('./backend/services/RendererNotificationSvc');
const dbBackupSvc = require('./backend/services/DbBackupSvc');

const mainSystem = require('./backend/system/MainSystem');

const path = require('path');
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
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
    cut: 'גזור',
    copy: 'העתק',
    paste: 'הדבק',
    save: 'שמור',
    saveImageAs: 'שמור תמונה',
    copyLink: 'העתק קישור',
    copyImageAddress: 'העתק קישור תמונה',
    inspect: 'Inspect'
  }
});

//app details
const companyName = "NDT Solutions";
const appName = "מערכת ניהול דוחות";

let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    title: appName + " - " + companyName,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    //backgroundColor: '#191b21'
    resizeable: false,
    show: false
  });

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);

  //init the renderer notification service
  rendererotificationSvc.setWebContents(mainWindow.webContents);

  ipcMain.on('system-start-services', (event, arg) => {
    mainSystem.startServices();
  });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
  /* console.log(process.resourcesPath);
  console.log(app.getAppPath()); */
  //const testJson = await fse.readJson(path.join(process.resourcePath, 'extraResources', 'confgis\\config.json'));

  //dialog.showErrorBox("error", __dirname);
  //add react dev tools
  /* BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), '/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0')
  ); */

  powerMonitor.on('resume', () => {
    console.log('The system is up');
    //const generateReports = reportsGeneratorSvc.checkIfneedToGenerateReports();
    //console.log(generateReports);
  });

}

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  app.on('ready', createWindow);

  app.on('before-quit', async (event) => {
    event.preventDefault();
    console.log("before i quit");
    await dbBackupSvc.initiateBackup();
    //app.exit(0);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

mainSystem.startSystem();

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});



