// LIBRARIES
const path = require('path');
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();
const sqlite3 = require('sqlite3');
const simpleNodeLogger = require('simple-node-logger');

const fs = require('fs').promises;
const util = require('util');

//========================= my ipc's imports =========================//
const monthExpansesIpc = require('../../electron/ipcs/monthExpanses.ipc');
const budgetExecutionIpc = require('../../electron/ipcs/budgetExecution.ipc');
const summarizedBudgetIpc = require('../../electron/ipcs/SummarizedBudget.ipc');
const sidebarIpc = require('../../electron/ipcs/sidebar.ipc');
const summarizedSectionsIpc = require('../../electron/ipcs/summarizedSections.ipc');
const expansesCodesIpc = require('../../electron/ipcs/expansesCodes.ipc');
const generalSettingsIpc = require('../../electron/ipcs/generalSettings.ipc');
const registeredMonthsIpc = require('../../electron/ipcs/registeredMonths.ipc');
const registeredYearsIpc = require('../../electron/ipcs/registeredYears.ipc');
const registeredQuartersIpc = require('../../electron/ipcs/registeredQuarters.ipc');
const monthlyStatsIpc = require('../../electron/ipcs/monthlyStats.ipc');
const quarterlyStatsIpc = require('../../electron/ipcs/quarterlyStats.ipc');
const yearlyStatsIpc = require('../../electron/ipcs/yearlyStats.ipc');
const tableSettingsIpc = require('../../electron/ipcs/tableSettings.ipc');
const IOIpc = require('../../electron/ipcs/IO.ipc');
const settingsIpc = require('../../electron/ipcs/settings.ipc');
const dbBackupIpc = require('../../electron/ipcs/dbBackup.ipc');
const excelIpc = require('../../electron/ipcs/excel.ipc');

//========================= services =========================//
const reportsGeneratorSvc = require('../services/ReportsGeneratorSvc');
const dbBackupSvc = require('../services/DbBackupSvc');

const connectionPool = require('../connection/ConnectionPool');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

// location of the settings folder
const appSettingsFolderLocation = platform === "linux" ? path.join(homedir, "Dropbox") : `${homedir}\\AppData\\Roaming`;
const appSettingsFolder = platform === "linux" ? path.join(appSettingsFolderLocation, "/ndts/") : `${appSettingsFolderLocation}\\ndts\\`;
// app settings folder structure
const appDBFolder = platform === "linux" ? path.join(appSettingsFolder, "/db") : `${appSettingsFolder}\\db`;
const appConfigFolder = platform === "linux" ? path.join(appSettingsFolder, "/config") : `${appSettingsFolder}\\config`;
const appBackupFolder = platform === "linux" ? path.join(appSettingsFolder, "/backup") : `${appSettingsFolder}\\backup`;

// database file name
const DB_NAME = "mezach-db.sqlite";

// database file location
const dbFilePath = platform === "linux" ? `${appDBFolder}/${DB_NAME}` : `${appDBFolder}\\${DB_NAME}`;

// config file location
const configPath = platform === "linux" ? `${appConfigFolder}/config.json` : `${appConfigFolder}\\config.json`;

// backup names file location
const backupsNamesPath = platform === "linux" ? `${appConfigFolder}/backupsNames.json` : `${appConfigFolder}\\backupsNames.json`;

class MainSystem {

  initDBConnection() {
    // create the connection pool
    connectionPool.createConnection(dbFilePath);
  }

  async firstTimeSetup({ userDBFilePath, reportsPath }) {

    if (!fs.existsSync("./ramotmezach")) {
      await fs.mkdir("./ramotmezach");
    }

    if (!fs.existsSync(appDBFolder)) {
      fs.mkdirSync(appDBFolder);
    }
    if (!fs.existsSync(appConfigFolder)) {
      fs.mkdirSync(appConfigFolder);
    }
    if (!fs.existsSync(appBackupFolder)) {
      fs.mkdirSync(appBackupFolder);
    }

    // create a stdout and file logger
    this.log = simpleNodeLogger.createSimpleLogger(appSettingsFolder + 'project.log');

    // if the user passed a location to a previous exisitng database,
    // copy the user's database to the location of the app database
    if (userDBFilePath) {
      const dbFile = await readFilePromise(userDBFilePath);
      await writeFilePromise(`${dbPath}bdika.sqlite`, dbFile)
    }
    // create an empty database if the user did not
    // specify his own exisiting database
    else {
      this.db = new sqlite3.Database(`${dbPath}/mezach-db-test.sqlite`, (err) => {
        if (err) {
          console.log('Could not connect to database', err)
        } else {
          console.log('Connected to database')
        }
      })
    }

  }

  initializeIpcs() {
    sidebarIpc();

    monthExpansesIpc();

    budgetExecutionIpc();

    summarizedBudgetIpc();

    summarizedSectionsIpc();

    expansesCodesIpc();

    generalSettingsIpc();

    registeredMonthsIpc();

    registeredYearsIpc();

    registeredQuartersIpc();

    monthlyStatsIpc();

    quarterlyStatsIpc();

    yearlyStatsIpc();

    tableSettingsIpc();

    IOIpc();

    settingsIpc();

    dbBackupIpc();

    excelIpc();

    //servicesIpc();
  }

  startServices() {
    //start the backup service
    dbBackupSvc.init();

    // start the reports generator service
    //reportsGeneratorSvc.init();
  }

  async startSystem() {
    await this.initDBConnection();
    this.initializeIpcs();
  }

}

module.exports = new MainSystem();