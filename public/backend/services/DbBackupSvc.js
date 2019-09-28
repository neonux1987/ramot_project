const schedule = require('node-schedule');

class DbBackupSvc {

  constructor() {
    this.dbBackupRule = new schedule.RecurrenceRule();
  }

  activate() {

    //fetch db backup settings

    //apply the settings to the scheduler
    rule.second = 30;
    //execute scheduler
    let j = schedule.scheduleJob(rule, function () {
      console.log('Today is recognized by Rebecca Black!');
    });
  }

  modifySchedule(time, days) {

  }

  stop() {
    this.dbBackupRule.cancel();
  }

}

module.exports = DbBackupSvc;