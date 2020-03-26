//========================= electron imports =========================//
const { app, BrowserWindow, ipcMain } = require('electron');

//========================= my db config imports =========================//
const createDBConnection = require('./backend/dao/connection/dbconfig');

//========================= services =========================//
//const rendererotificationSvc = require('./backend/services/RendererNotificationSvc');
//const reportsGeneratorSvc = require('./backend/services/ReportsGeneratorSvc');

//const mainSystem = require('./backend/system/MainSystem');

const path = require('path');
const os = require('os');
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

/* {
  label: 'תפריט',
    menu: actions => [
      actions.copyLink({
        transform: content => `modified_link_${content}`
      }),
      actions.separator(),
      {
        label: 'Unicorn'
      },
      actions.separator(),
      actions.copy({
        transform: content => `modified_copy_${content}`
      }),
      {
        label: 'Invisible',
        visible: false
      },
      actions.paste({
        transform: content => `modified_paste_${content}`
      })
    ]
} */

//app details
const companyName = "NDT Solutions";
const appName = "מערכת ניהול דוחות";

let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

function createWindow() {
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

  //add react dev tools
  /* BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), '/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0')
  ); */

  /* powerMonitor.on('resume', () => {
    console.log('The system is up');
    const generateReports = reportsGeneratorSvc.checkIfneedToGenerateReports();
    console.log(generateReports);
  }) */
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

  app.on('web-contents-created', (event, webContents) => {
    //init the renderer notification service
    //rendererotificationSvc.setWebContents(webContents);

    /* setTimeout(() => {
      mainSystem.startServices();
    }, 15000); */
  })

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

//create db connection
let knex = createDBConnection();

/* mainSystem.firstTimeSetup({
  //dbFilePath: "/home/ag1987/Dropbox/ndts/db/mezach-db.sqlite"
}); */

/* mainSystem.startSystem();

ipcMain.on('system-start-services', (event, arg) => {
  mainSystem.startServices();
}); */



