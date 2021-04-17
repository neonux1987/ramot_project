//========================= Libraries =========================//
require('v8-compile-cache');
const { app, BrowserWindow } = require('electron');
const os = require('os');
const path = require('path');
const isDev = require('electron-is-dev');
const contextMenu = require('electron-context-menu');

//========================= services =========================//
const mainSystem = require('./backend/system/MainSystem');

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
const icon = path.join(app.getAppPath(), 'Icon/ramot-group-icon.png');

let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

async function createWindow() {
  let loading = new BrowserWindow({
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
    icon,
  });

  loading.once('show', () => {

    // Create the browser window.
    // needs to be created outside the start system func
    // to avoid mainWindow as null in ipc's
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
      icon,
      frame: false,
      resizeable: false,
      show: false
    });

    mainWindow.uniqueId = "mainWindow";

    /* start system */
    mainSystem.startSystem().then(() => {

      //const ses = mainWindow.webContents.session;

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

      mainWindow.webContents.once('dom-ready', () => {
        mainWindow.show();
        loading.hide();
        loading.close();
      });
      // long loading html
      mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    });
    /* end start system */

  });
  loading.loadURL(isDev ? 'http://localhost:3000/loader/loader.html' : `file://${path.join(__dirname, '../build/loader/loader.html')}`)
  loading.show();

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





