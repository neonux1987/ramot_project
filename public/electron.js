//========================= electron imports =========================//
const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');

//========================= services =========================//
const rendererotificationSvc = require('./backend/services/RendererNotificationSvc');
const mainSystem = require('./backend/system/MainSystem');
const os = require('os');
const path = require('path');
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');

//token
process.env.GH_TOKEN = "f55ef78253864c051c9520dca400f7a8313ff8fa";

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
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },

    backgroundColor: "#eee",
    icon: path.join(app.getAppPath(), 'Icon/ramot-group-icon.png'),
    frame: false,
    resizeable: false,
    show: false
  });

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  const ses = mainWindow.webContents.session;

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    //add react dev tools
    //ses.loadExtension(
    //    path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.7.0_0')
    //);
  }

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.webContents.on('new-window', event => {
    event.preventDefault()
  });

  powerMonitor.on('resume', () => {
    console.log('The system is up');
    //const generateReports = reportsGeneratorSvc.checkIfneedToGenerateReports();
  });
}

//-------------------------------------------------------------------
// Will quit if a there's an instance already running,
// otherwise create the instance
//-------------------------------------------------------------------
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.on('ready', createWindow);

  //
  app.on('browser-window-created', (event, webContents) => {
    //init the renderer notification service
    rendererotificationSvc.setWebContents(webContents);
  });

  /* app.on('before-quit', async (event) => {
    event.preventDefault();
    app.exit(0);
  }); */

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

//-------------------------------------------------------------------
// Start the system
// loads ipc's listeners and all the backend,services etc...
//-------------------------------------------------------------------
mainSystem.startSystem();




