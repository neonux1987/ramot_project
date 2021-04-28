// LIBRARIES
const { dialog, app } = require('electron');

//const SchemaBuilder = require('../dao/schemaBuilder/SchemaBuilder');

const { openLogFile } = require('../../helpers/utils');

const SystemPaths = require('./SystemPaths');

class MainSystem {

  async initializeIpcs() {

    //========================= my ipc's imports =========================//
    const monthExpansesIpc = require('../../ipcs/monthExpanses.ipc');
    const budgetExecutionIpc = require('../../ipcs/budgetExecution.ipc');
    const summarizedBudgetIpc = require('../../ipcs/SummarizedBudget.ipc');
    const menuIpc = require('../../ipcs/menu.ipc');
    const summarizedSectionsIpc = require('../../ipcs/summarizedSections.ipc');
    const expansesCodesIpc = require('../../ipcs/expansesCodes.ipc');
    const generalSettingsIpc = require('../../ipcs/generalSettings.ipc');
    const registeredMonthsIpc = require('../../ipcs/registeredMonths.ipc');
    const registeredYearsIpc = require('../../ipcs/registeredYears.ipc');
    const registeredQuartersIpc = require('../../ipcs/registeredQuarters.ipc');
    const registeredReportsIpc = require('../../ipcs/registeredReports.ipc');
    const monthlyStatsIpc = require('../../ipcs/monthlyStats.ipc');
    const quarterlyStatsIpc = require('../../ipcs/quarterlyStats.ipc');
    const yearlyStatsIpc = require('../../ipcs/yearlyStats.ipc');
    const tableSettingsIpc = require('../../ipcs/tableSettings.ipc');
    const settingsIpc = require('../../ipcs/settings.ipc');
    const registeredBackupsIpc = require('../../ipcs/registeredBackups.ipc');
    const dbBackupIpc = require('../../ipcs/dbBackup.ipc');
    const excelIpc = require('../../ipcs/excel.ipc');
    const emptyReportsGeneratorIpc = require('../../ipcs/emptyReportsGenerator.ipc');
    const mainProcessIpc = require('../../ipcs/mainProcess.ipc');
    const restoreDbIpc = require('../../ipcs/restoreDb.ipc');
    const updatesIpc = require('../../ipcs/updates.ipc');
    const printerIpc = require('../../ipcs/printer.ipc');
    const buildingsIpc = require('../../ipcs/buildings.ipc');

    mainProcessIpc();

    menuIpc();

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
      const MenuLogic = require('../logic/MenuLogic');

      const setupLogic = new SetupLogic();
      const settingsLogic = new SettingsLogic();

      // if the app runs for the first time
      await setupLogic.firstTimeSetup();

      // set up the db connection
      await connectionPool.createConnection();

      const updatesLogic = new UpdatesLogic();

      const settings = await settingsLogic.getSettings();

      //fetch menu data
      const menuLogic = new MenuLogic();
      const menu = await menuLogic.getMenu();

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