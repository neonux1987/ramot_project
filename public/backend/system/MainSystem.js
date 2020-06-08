// LIBRARIES
const { dialog, app, BrowserWindow } = require('electron');
const path = require('path');
const logManager = require('../logger/LogManager');
const rendererNotificationSvc = require('../services/RendererNotificationSvc');
const MenuDao = require('../dao/MenuDao');
const SchemaBuilder = require('../dao/schemaBuilder/SchemaBuilder');

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
const registeredBackupsIpc = require('../../electron/ipcs/registeredBackups.ipc');
const dbBackupIpc = require('../../electron/ipcs/dbBackup.ipc');
const excelIpc = require('../../electron/ipcs/excel.ipc');
const emptyReportsGeneratorIpc = require('../../electron/ipcs/emptyReportsGenerator.ipc');
const servicesIpc = require('../../electron/ipcs/services.ipc');
const mainProcessIpc = require('../../electron/ipcs/mainProcess.ipc');
const restoreDbIpc = require('../../electron/ipcs/restoreDb.ipc');
const updatesIpc = require('../../electron/ipcs/updates.ipc');

const { openLogFile } = require('../../helpers/utils');

const SystemPaths = require('./SystemPaths');

const ServicesLogic = require('../logic/ServicesLogic');

const SetupLogic = require('../logic/SetupLogic');

const connectionPool = require('../connection/ConnectionPool');

const SettingsLogic = require('../logic/SettingsLogic');

class MainSystem {

  constructor() {
    this.servicesLogic = undefined;
    this.setupLogic = new SetupLogic();
    this.settingsLogic = new SettingsLogic();
    this.logger = logManager.getLogger();
  }

  initializeIpcs() {

    mainProcessIpc();

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

    registeredBackupsIpc();

    dbBackupIpc();

    excelIpc();

    emptyReportsGeneratorIpc();

    registeredReportsIpc();

    servicesIpc();

    restoreDbIpc();

    updatesIpc();
  }

  async startServices() {
    await this.servicesLogic.startAllServices()
      .catch((result) => {
        rendererNotificationSvc.notifyRenderer("notify-renderer", "systemError", result.message);
        this.logger.error(result.error);
      });
  }

  async stopServices() {
    await this.servicesLogic.stopAllServices()
      .catch((result) => {
        rendererNotificationSvc.notifyRenderer("notify-renderer", "systemError", result.message);
        this.logger.error(result.error);
      });
  }

  async startSystem() {
    try {
      // if the app runs for the first time
      await this.setupLogic.firstTimeSetup();

      // set up the db connection
      await connectionPool.createConnection();

      this.servicesLogic = new ServicesLogic();

      const settings = await this.settingsLogic.getSettings();

      //fetch menu data
      const menuDao = new MenuDao();
      const menu = await menuDao.getMenu();

      // In the main process.
      global.sharedObject = {
        buildings: menu,
        pages: ["monthExpanses", "budgetExecutions", "summarizedBudgets"],
        settings
      }

      /* const schemaBuilder = new SchemaBuilder();
      //modify table
      await schemaBuilder.modifyTableSchema(); */

      // initialize all the ipc's for connection
      // between the main process and the renderer
      this.initializeIpcs();
    } catch (error) {
      this.logger.error(error.toString());

      const title = "שגיאת הפעלה";
      const message = `
      המערכת נכשלה בעת ההפעלה עקב תקלה.\n
      לפרטים נוספים יש לקרוא את יומן האירועים שנמצא בתיקייה
      ${SystemPaths.paths.logs_folder}
      `;

      const dialogData = await dialog.showMessageBox({
        title,
        message,
        type: "error",
        buttons: ["סגור את האפליקציה", "פתח יומן אירועים"]
      });

      if (dialogData.response === 1) {
        openLogFile();
        app.quit(0);
      }
      else app.quit(0);

    }

  }

  async stopSystem() {
    await this.stopServices();
    await connectionPool.destroy();
  }

}

module.exports = new MainSystem();