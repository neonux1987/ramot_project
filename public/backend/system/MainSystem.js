// LIBRARIES
const { dialog, shell, app } = require('electron');
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

const ServicesLogic = require('../logic/ServicesLogic');

const ConfigurationLogic = require('../logic/ConfigurationLogic');

const connectionPool = require('../connection/ConnectionPool');

class MainSystem {

  constructor() {
    this.servicesLogic = undefined;
    this.configurationLogic = new ConfigurationLogic();
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
      await this.configurationLogic.firstTimeSetup();

      this.servicesLogic = new ServicesLogic();

      // set up the db connection
      await connectionPool.createConnection();

      //fetch menu data
      /* const menuDao = new MenuDao();
      const menu = await menuDao.getMenu(); */

      // In the main process.
      /* global.sharedObject = {
        menuData: menu
      } */

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
      לפרטים נוספים יש לקרוא את יומן האירועים שנמצא בתיקיית logs
      אשר נמצא בתיקיית התוכנה.
      `;

      const dialogData = await dialog.showMessageBox({
        title,
        message,
        type: "error",
        buttons: ["סגור את האפליקציה", "פתח יומן אירועים"]
      });

      if (dialogData.response === 1)
        this.openEventsLog();
      else
        app.quit(0);

    }

  }

  openEventsLog() {
    console.log(path.join(app.getAppPath(), "logs", "ramot-mezach-errors.log"));
    shell.showItemInFolder(path.join(app.getAppPath(), "logs", "ramot-mezach-errors.log"));
  }

  async stopSystem() {
    await this.stopServices();
    await connectionPool.destroy();
  }

}

module.exports = new MainSystem();