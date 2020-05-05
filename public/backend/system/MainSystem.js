// LIBRARIES
const { dialog } = require('electron');
const logManager = require('../logger/LogManager');
const rendererNotificationSvc = require('../services/RendererNotificationSvc');

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

const ServicesLogic = require('../logic/ServicesLogic');

const ConfigurationLogic = require('../logic/ConfigurationLogic');

const connectionPool = require('../connection/ConnectionPool');

class MainSystem {

  constructor() {
    this.servicesLogic = undefined;
    this.configurationLogic = new ConfigurationLogic();
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
  }

  async startServices() {
    await this.servicesLogic.startAllServices()
      .catch((result) => {
        rendererNotificationSvc.notifyRenderer("notify-renderer", "systemError", result.message);
      });
  }

  async startSystem() {
    try {
      logManager.createErrorLog();

      // if the app runs for the first time
      await this.configurationLogic.firstTimeSetup();

      this.servicesLogic = new ServicesLogic();

      // set up the db connection
      await connectionPool.createConnection();

      // initialize all the ipc's for connection
      // between the main process and the renderer
      this.initializeIpcs();
    } catch (e) {
      const logger = logManager.getLogger();

      logger.error('dadada');

      const title = "שגיאת הפעלה";
      const message = `
      המערכת נכשלה בעת ההפעלה עקב תקלה.\n
      לפרטים נוספים יש לקרוא את יומן האירועים שנמצא ב:
      C:\\ramot-mezach-error-log.txt
      `;
      dialog.showErrorBox(title, message);
    }

  }

}

module.exports = new MainSystem();