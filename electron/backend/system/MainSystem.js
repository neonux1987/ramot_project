// LIBRARIES
const { dialog, app, BrowserWindow } = require('electron');

const { openLogFile, sendToWindow, getWindow, AppErrorDialog } = require('../../helpers/utils');

const SystemPaths = require('./SystemPaths');

class MainSystem {

  async initializeIpcs() {

    //========================= my ipc's imports =========================//
    const monthExpansesIpc = require('../../ipcs/monthExpanses.ipc');
    const budgetExecutionIpc = require('../../ipcs/budgetExecution.ipc');
    const summarizedBudgetIpc = require('../../ipcs/SummarizedBudget.ipc');
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
    const reportsIpc = require('../../ipcs/reports.ipc');
    const mainProcessIpc = require('../../ipcs/mainProcess.ipc');
    const restoreDbIpc = require('../../ipcs/restoreDb.ipc');
    const updatesIpc = require('../../ipcs/updates.ipc');
    const printerIpc = require('../../ipcs/printer.ipc');
    const buildingsIpc = require('../../ipcs/buildings.ipc');

    mainProcessIpc();

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

    reportsIpc();

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
      const BuildingsLogic = require('../logic/BuildingsLogic');

      const setupLogic = new SetupLogic();
      const settingsLogic = new SettingsLogic();

      // if the app runs for the first time
      await setupLogic.firstTimeSetup();

      // set up the db connection
      await connectionPool.createConnection();

      const updatesLogic = new UpdatesLogic();

      const settings = await settingsLogic.getSettings();

      //fetch menu data
      const buildingsLogic = new BuildingsLogic();
      const buildings = await buildingsLogic.getAllBuildings();

      // In the main process.
      global.sharedObject = {
        buildings,
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

      throw error;
    }

  }

  async scheduledTasks() {
    await this.deleteBuildingScheduleTask();
  }

  /**
   * if 30 days or more passed since the user changed
   * the status of the buildings to deleted, notify the renderer 
   * to delete the buildings
   */
  async deleteBuildingScheduleTask() {
    const BuildingsLogic = require('../logic/BuildingsLogic');
    const buildingsLogic = new BuildingsLogic();

    const currentDateTime = (new Date()).getTime();

    const buildings = await buildingsLogic.getAllBuildings();

    const buildingsForDeletion = [];

    buildings.forEach(({ buildingName, status, deletionDate, id }) => {

      if (status === "מחוק") {

        const deletionDateTime = Date.parse(deletionDate);

        const differenceTime = deletionDateTime - currentDateTime;

        // To calculate the no. of days between two dates
        const differenceDays = differenceTime / (1000 * 3600 * 24);

        if (differenceDays > 30) {
          buildingsForDeletion.push({
            id,
            buildingName
          })

        }

      }

    });

    if (buildingsForDeletion.length > 0)
      sendToWindow("deletion", buildingsForDeletion);

  }

}

module.exports = new MainSystem();
