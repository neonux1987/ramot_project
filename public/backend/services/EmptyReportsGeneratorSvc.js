const schedule = require('node-schedule');
const RegisteredReportsLogic = require('../logic/RegisteredReportsLogic');
const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
const MenuDao = require('../dao/MenuDao');
const Helper = require('../../helpers/Helper');
const rendererNotificationSvc = require('./RendererNotificationSvc');


class EmptyReportsGeneratorSvc {

  constructor() {

    this.registeredReportsLogic = new RegisteredReportsLogic();
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.menuDao = new MenuDao();
    this.backupSchedule = null;
  }

  init() {

    //cron settings
    const cron = "0 22 2 1 * *";

    if (this.checkIfneedToGenerateReports())
      this.generateMissingReports();

    //execute scheduler
    this.backupSchedule = schedule.scheduleJob(cron, async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();// remember month starts at 0

      const buildings = await this.menuDao.getMenu();

      this.generateReport(currentYear, currentMonth, buildings);

      // use notification service to notify
      // the user when the generations begins
      // and when it ends

      console.log("new month reports are getting generated for all the buildings.");
    });

  }

  async checkIfneedToGenerateReports() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();// remember month starts at 0

    const registeredReports = await this.registeredReportsLogic.getRegisteredReports();
    const lastReport = registeredReports[0]; // remember the data you get is ordered by desc year and month
    const {
      year,
      month
    } = lastReport;

    if (year < currentYear) {
      return true;
    } else if (year === currentYear) {
      if (month < currentMonth) {
        return true;
      }
    } else {
      return false;
    }

  }

  start() {

  }

  async generateMissingReports() {

    rendererNotificationSvc.notifyRenderer("notify-renderer", "reportsGenerationStarted", "המערכת מייצרת כעת דוחות לכל הבניינים...");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();// remember month starts at 0

    const registeredReports = await this.registeredReportsLogic.getRegisteredReports();
    const lastReport = registeredReports[0]; // remember the data you get is ordered by desc year and month
    const {
      year,
      month
    } = lastReport;

    const buildings = await this.menuDao.getMenu();

    // loop through all the registered year up to the 
    // current year includingte current year
    /* for (let i = year; i <= currentYear; i++) {
      // loop through all the months in a whole year 
      // if not the current year
      if (i < currentYear) {
        for (let j = 0; j <= 11; j++) {
          this.generateReport(i, j, buildings);
          this.registeredReportsLogic.addNewReport({
            year: i,
            month: j
          });
        }
      }
      // this is current year. loop through months up to the
      // current month including the current month
      else {
        for (let k = month; k <= currentMonth; k++) {
          this.generateReport(i, k, buildings);
          this.registeredReportsLogic.addNewReport({
            year: i,
            month: k
          });
        }
      }
    } */

    rendererNotificationSvc.notifyRenderer("notify-renderer", "reportsGenerationFinished", "המערכת סיימה. הדוחות החדשים מוכנם.");
  }

  generateReport(year, month, buildings) {
    const dateObj = {
      year,
      month: Helper.getCurrentMonthEng(month),
      monthHeb: Helper.getCurrentMonthHeb(month),
      quarter: Helper.getCurrentQuarter(month),
      quarterHeb: Helper.getCurrentQuarterHeb()
    }
    buildings.forEach(async building => {
      await this.monthExpansesLogic.createEmptyReport(building.engLabel, dateObj);
    });
  }

  async stop() {
    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }
    //activate the backup
    settings.reportsGenerator.active = false;

    //make sure that the scheduler object in not null
    if (this.backupSchedule === null) {
      return Promise.reject(new Error("לא ניתן לבטל את השירות, מכיוון שהשירות כבר בוטל."));
    }

    //cancel the job
    this.backupSchedule.cancel();

    //basically if the next invocation date object is null
    //that means the job is cancelled
    if (!this.backupSchedule.nextInvocation()) {
      //init scheduler
      this.backupSchedule = null;
      //save settings
      this.settingsLogic.updateSettings(settings);
      return Promise.resolve("the job is cancelled.");
    } else {
      return Promise.reject("unable to cancel scheduled job.");
    }
  }

}

module.exports = new EmptyReportsGeneratorSvc();