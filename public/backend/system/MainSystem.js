// LIBRARIES
const path = require('path');
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();
const sqlite3 = require('sqlite3');
//const simpleNodeLogger = require('simple-node-logger');

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
const registeredReportsIpc = require('../../electron/ipcs/registeredReports.ipc');
const monthlyStatsIpc = require('../../electron/ipcs/monthlyStats.ipc');
const quarterlyStatsIpc = require('../../electron/ipcs/quarterlyStats.ipc');
const yearlyStatsIpc = require('../../electron/ipcs/yearlyStats.ipc');
const tableSettingsIpc = require('../../electron/ipcs/tableSettings.ipc');
const IOIpc = require('../../electron/ipcs/IO.ipc');
const settingsIpc = require('../../electron/ipcs/settings.ipc');
const dbBackupIpc = require('../../electron/ipcs/dbBackup.ipc');
const excelIpc = require('../../electron/ipcs/excel.ipc');
const emptyReportsGeneratorIpc = require('../../electron/ipcs/emptyReportsGenerator.ipc');
const servicesIpc = require('../../electron/ipcs/services.ipc');

const ServicesLogic = require('../logic/ServicesLogic');

const ConfigurationLogic = require('../logic/ConfigurationLogic');

const connectionPool = require('../connection/ConnectionPool');

class MainSystem {

  constructor() {
    this.servicesLogic = undefined;
    this.configurationLogic = new ConfigurationLogic();
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

    emptyReportsGeneratorIpc();

    registeredReportsIpc();

    servicesIpc();
  }

  startServices() {
    try {
      this.servicesLogic.startAllServices();
    } catch (e) {
      console.log(e);
    }
  }

  async startSystem() {

    try {
      // if the app runs for the first time
      await this.configurationLogic.firstTimeSetup();

      this.servicesLogic = new ServicesLogic();

      // set up the db connection
      await connectionPool.createConnection();
    } catch (e) {
      console.log(e);
    }

    // initialize all the ipc's for connection
    // between the main process and the renderer
    this.initializeIpcs();
  }

}

module.exports = new MainSystem();