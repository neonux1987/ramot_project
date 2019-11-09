//========================= electron imports =========================//
const { app, BrowserWindow } = require('electron');

//========================= my db config imports =========================//
const createDBConnection = require('./backend/dao/connection/dbconfig');

//========================= my ipc's imports =========================//
const monthExpansesIpc = require('./electron/ipcs/monthExpanses.ipc');
const budgetExecutionIpc = require('./electron/ipcs/budgetExecution.ipc');
const summarizedBudgetIpc = require('./electron/ipcs/SummarizedBudget.ipc');
const sidebarIpc = require('./electron/ipcs/sidebar.ipc');
const summarizedSectionsIpc = require('./electron/ipcs/summarizedSections.ipc');
const expansesCodesIpc = require('./electron/ipcs/expansesCodes.ipc');
const generalSettingsIpc = require('./electron/ipcs/generalSettings.ipc');
const registeredMonthsIpc = require('./electron/ipcs/registeredMonths.ipc');
const registeredYearsIpc = require('./electron/ipcs/registeredYears.ipc');
const registeredQuartersIpc = require('./electron/ipcs/registeredQuarters.ipc');
const monthlyStatsIpc = require('./electron/ipcs/monthlyStats.ipc');
const quarterlyStatsIpc = require('./electron/ipcs/quarterlyStats.ipc');
const yearlyStatsIpc = require('./electron/ipcs/yearlyStats.ipc');
const IOIpc = require('./electron/ipcs/IO.ipc');
const settingsIpc = require('./electron/ipcs/settings.ipc');
const contextMenu = require('electron-context-menu');
const dbBackupIpc = require('./electron/ipcs/dbBackup.ipc');
const dbBackupSvc = require('./backend/services/DbBackupSvc');

//========================= services =========================//
const reportsGeneratorSvc = require('./backend/services/ReportsGeneratorSvc');
const rendererotificationSvc = require('./backend/services/RendererNotificationSvc');

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
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    transparent: true
    //backgroundColor: '#191b21'
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);

  //init the renderer notification service
  rendererotificationSvc.setWebContents(mainWindow.webContents);
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

sidebarIpc(knex);

monthExpansesIpc(knex);

budgetExecutionIpc(knex);

summarizedBudgetIpc(knex);

summarizedSectionsIpc(knex);

expansesCodesIpc(knex);

generalSettingsIpc(knex);

registeredMonthsIpc(knex);

registeredYearsIpc(knex);

registeredQuartersIpc(knex);

monthlyStatsIpc(knex);

quarterlyStatsIpc(knex);

yearlyStatsIpc(knex);

IOIpc();

settingsIpc();

dbBackupIpc();

//start the backup service
dbBackupSvc.init();

reportsGeneratorSvc.init();




