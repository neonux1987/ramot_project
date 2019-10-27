const schedule = require('node-schedule');
const RegisteredMonthsLogic = require('../logic/RegisteredMonthsLogic');
const RegisteredQuartersLogic = require('../logic/RegisteredQuartersLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const rendererNotificationSvc = require('./RendererNotificationSvc');


class ReportsGenerator {

  constructor() {

    this.registeredMonthsLogic = new RegisteredMonthsLogic();
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
    this.registeredYearsLogic = new RegisteredYearsLogic();
    this.backupSchedule = null;
  }

  async init() {

    //const registeredYears = await this.registeredYearsLogic.getAllRegisteredMonths();

    //current date
    const date = new Date();

    //cron settings
    const cron = "0 22 2 1 * *"

    //execute scheduler
    //this.backupSchedule = schedule.scheduleJob(cron, () => {
    //  console.log(this.backupSchedule);
    //});

  }

}

module.exports = new ReportsGenerator();