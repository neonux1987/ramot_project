// LIBRARIES
const { dialog, app } = require('electron');

//const SchemaBuilder = require('../dao/schemaBuilder/SchemaBuilder');

const { openLogFile } = require('../../helpers/utils');

const SystemPaths = require('./SystemPaths');

class MainSystem {

  async initializeIpcs() {

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
    const settingsIpc = require('../../electron/ipcs/settings.ipc');
    const registeredBackupsIpc = require('../../electron/ipcs/registeredBackups.ipc');
    const dbBackupIpc = require('../../electron/ipcs/dbBackup.ipc');
    const excelIpc = require('../../electron/ipcs/excel.ipc');
    const emptyReportsGeneratorIpc = require('../../electron/ipcs/emptyReportsGenerator.ipc');
    const mainProcessIpc = require('../../electron/ipcs/mainProcess.ipc');
    const restoreDbIpc = require('../../electron/ipcs/restoreDb.ipc');
    const updatesIpc = require('../../electron/ipcs/updates.ipc');
    const printerIpc = require('../../electron/ipcs/printer.ipc');
    const buildingsIpc = require('../../electron/ipcs/buildings.ipc');

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

    settingsIpc();

    registeredBackupsIpc();

    dbBackupIpc();

    excelIpc();

    emptyReportsGeneratorIpc();

    registeredReportsIpc();

    restoreDbIpc();

    updatesIpc();

    printerIpc();

    buildingsIpc();
  }

  async startSystem() {
    try {
      const SetupLogic = require('../logic/SetupLogic');
      const UpdatesLogic = require('../logic/UpdatesLogic');
      const connectionPool = require('../connection/ConnectionPool');
      const SettingsLogic = require('../logic/SettingsLogic');
      const MenuDao = require('../dao/MenuDao');

      const setupLogic = new SetupLogic();
      const settingsLogic = new SettingsLogic();

      // if the app runs for the first time
      await setupLogic.firstTimeSetup();

      // set up the db connection
      await connectionPool.createConnection();

      const updatesLogic = new UpdatesLogic();

      const settings = await settingsLogic.getSettings();

      //fetch menu data
      const menuDao = new MenuDao();
      const menu = await menuDao.getMenu();

      // In the main process.
      global.sharedObject = {
        buildings: menu,
        pages: ["monthExpanses", "budgetExecutions", "summarizedBudgets", "statistics"],
        settings
      }

      await updatesLogic.runUpdateLogic();

      // initialize all the ipc's for connection
      // between the main process and the renderer
      await this.initializeIpcs();
    } catch (error) {
      const logManager = require('../logger/LogManager');
      const logger = logManager.getLogger();

      logger.error(error.toString());

      const title = "שגיאת הפעלה";
      const message = `
      המערכת נכשלה בעת ההפעלה עקב תקלה.\n
      לפרטים נוספים יש לקרוא את יומן האירועים שנמצא בתיקייה
      ${SystemPaths.paths.logs_folder_path}
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
    await connectionPool.destroy();
  }

}

module.exports = new MainSystem();