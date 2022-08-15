// LIBRARIES
const { sendToWindow } = require("../../helpers/utils");
const CustomError = require("../customErrors/CustomError");

class MainSystem {
  async initializeIpcs() {
    //========================= my ipc's imports =========================//
    const monthExpansesIpc = require("../../ipcs/monthExpanses.ipc");
    const budgetExecutionIpc = require("../../ipcs/budgetExecution.ipc");
    const summarizedBudgetIpc = require("../../ipcs/SummarizedBudget.ipc");
    const summarizedSectionsIpc = require("../../ipcs/summarizedSections.ipc");
    const expansesCodesIpc = require("../../ipcs/expansesCodes.ipc");
    const defaultExpansesCodesIpc = require("../../ipcs/defaultExpansesCodes.ipc");
    const generalSettingsIpc = require("../../ipcs/generalSettings.ipc");
    const registeredMonthsIpc = require("../../ipcs/registeredMonths.ipc");
    const registeredYearsIpc = require("../../ipcs/registeredYears.ipc");
    const registeredQuartersIpc = require("../../ipcs/registeredQuarters.ipc");
    const registeredReportsIpc = require("../../ipcs/registeredReports.ipc");
    const monthlyStatsIpc = require("../../ipcs/monthlyStats.ipc");
    const quarterlyStatsIpc = require("../../ipcs/quarterlyStats.ipc");
    const yearlyStatsIpc = require("../../ipcs/yearlyStats.ipc");
    const settingsIpc = require("../../ipcs/settings.ipc");
    const registeredBackupsIpc = require("../../ipcs/registeredBackups.ipc");
    const dbBackupIpc = require("../../ipcs/dbBackup.ipc");
    const reportsIpc = require("../../ipcs/reports.ipc");
    const mainProcessIpc = require("../../ipcs/mainProcess.ipc");
    const restoreDbIpc = require("../../ipcs/restoreDb.ipc");
    const updatesIpc = require("../../ipcs/updates.ipc");
    const printerIpc = require("../../ipcs/printer.ipc");
    const buildingsIpc = require("../../ipcs/buildings.ipc");

    mainProcessIpc();

    monthExpansesIpc();

    budgetExecutionIpc();

    summarizedBudgetIpc();

    summarizedSectionsIpc();

    expansesCodesIpc();

    defaultExpansesCodesIpc();

    generalSettingsIpc();

    registeredMonthsIpc();

    registeredYearsIpc();

    registeredQuartersIpc();

    monthlyStatsIpc();

    quarterlyStatsIpc();

    yearlyStatsIpc();

    settingsIpc();

    registeredBackupsIpc();

    dbBackupIpc();

    reportsIpc();

    registeredReportsIpc();

    restoreDbIpc();

    updatesIpc();

    printerIpc();

    buildingsIpc();
  }

  async startSystem() {
    try {
      // before the system starts, ensure
      // all the configuration files exist
      // if not create them
      const AppLogic = require("../logic/AppLogic");
      const SetupLogic = require("../logic/SetupLogic");
      const UpdatesLogic = require("../logic/UpdatesLogic");
      const connectionPool = require("../connection/ConnectionPool");

      const appLogic = new AppLogic();
      const setupLogic = new SetupLogic();
      const updatesLogic = new UpdatesLogic();

      // ensures all the app folders and config files exist
      // in case if dabase file not exisiting it will throw an error
      await appLogic.ensureAppFoldersAndConfigFiles();

      // must run first for knex configuration file
      await connectionPool.init();

      // if the app runs for the first time
      await setupLogic.firstTimeSetup();

      if (process.env.NODE_ENV === "development") {
        await setupLogic.setLocations();
      }

      // set up the db connection
      await connectionPool.createConnection();

      await updatesLogic.runUpdateLogic();

      // initialize all the ipc's for connection
      // between the main process and the renderer
      await this.initializeIpcs();
    } catch (error) {
      // TODO
      // if error type is of custom error or
      // it's children, don't log
      if (error.constructor !== CustomError) {
        const logManager = require("../logger/LogManager");
        const logger = logManager.getLogger();

        logger.error(error);
      }

      throw error;
    }
  }

  async scheduledTasks() {
    await this.deleteBuildingsInQueue();
  }

  /**
   * if 30 days or more passed since the user changed
   * the status of the buildings to deleted, notify the renderer
   * to delete the buildings
   */
  async deleteBuildingsInQueue() {
    const BuildingsLogic = require("../logic/BuildingsLogic");
    const buildingsLogic = new BuildingsLogic();

    const currentDateTime = new Date().getTime();

    const buildings = await buildingsLogic.getAllBuildings();

    const buildingsForDeletion = [];

    buildings.forEach(({ buildingName, status, deletionDate, id }) => {
      if (status === "מחוק") {
        const deletionDateTime = Date.parse(deletionDate);

        const differenceTime = currentDateTime - deletionDateTime;

        // To calculate the no. of days between two dates
        const differenceDays = differenceTime / (1000 * 3600 * 24);

        if (differenceDays > 30) {
          buildingsForDeletion.push({
            id,
            buildingName
          });
        }
      }
    });

    if (buildingsForDeletion.length > 0)
      sendToWindow("buildings-for-deletion-data", buildingsForDeletion);
  }
}

module.exports = new MainSystem();
