const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const createDBConnection = require('./backend/dao/connection/dbconfig');
const monthExpansesIpc = require('./electron/ipcs/monthExpanses.ipc');
const budgetExecutionIpc = require('./electron/ipcs/budgetExecution.ipc');
const summarizedBudgetIpc = require('./electron/ipcs/SummarizedBudget.ipc');
const sidebarIpc = require('./electron/ipcs/sidebar.ipc');
const summarizedSectionsIpc = require('./electron/ipcs/summarizedSections.ipc');
const expansesCodesIpc = require('./electron/ipcs/expansesCodes.ipc');
const contextMenu = require('electron-context-menu');

const path = require('path');
const isDev = require('electron-is-dev');

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [{
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
  }]
});

//app details
const companyName = "NDT Solutions";
const appName = "מערכת ניהול דוחות";

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    title: appName + " - " + companyName,
    //show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

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

//create db connection
let knex = createDBConnection();

//execute sidebar ipcs
sidebarIpc(knex);

//execute month expanses ipcs
monthExpansesIpc(knex);

budgetExecutionIpc(knex);

summarizedBudgetIpc(knex);

summarizedSectionsIpc(knex);

expansesCodesIpc(knex);