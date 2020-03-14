const schedule = require('node-schedule');
const RegisteredReportsLogic = require('../logic/RegisteredReportsLogic');
const rendererNotificationSvc = require('./RendererNotificationSvc');


class ReportsGenerator {

  constructor() {

    this.registeredReportsLogic = new RegisteredReportsLogic();
    this.backupSchedule = null;
  }

  async init() {

    //cron settings
    const cron = "0 22 2 1 * *"

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;//make january start from 1

    const registeredReports = await this.registeredReportsLogic.getRegisteredReports();
    const lastReport = registeredReports[0]; // remember the data you get is ordered by desc year and month

    for (let i = lastReport.year; i <= currentYear; i++) {
      console.log(i);
    }

    //execute scheduler
    this.backupSchedule = schedule.scheduleJob(cron, () => {

      console.log(this.backupSchedule);
    });

  }

}

module.exports = new ReportsGenerator();