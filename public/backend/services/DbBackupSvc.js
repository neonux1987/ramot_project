const schedule = require('node-schedule');
const SettingsLogic = require('../logic/SettingsLogic');
const IOLogic = require('../logic/IOLogic');

class DbBackupSvc {

  constructor() {
    if (!!DbBackupSvc.instance) {
      return DbBackupSvc.instance;
    }

    DbBackupSvc.instance = this;
    this.settingsLogic = new SettingsLogic();
    this.ioLogic = new IOLogic();
    this.rule = new schedule.RecurrenceRule();
    this.backupSchedule = null;
    this.init();
    return this;

  }

  async init() {

    //fetch db backup settings
    const settings = await this.settingsLogic.getSettings();
    if (settings.db_backup.active) {
      const backupTime = new Date(settings.db_backup.time);

      //apply the settings to the scheduler
      this.rule.hours = backupTime.getHours();
      this.rule.minute = backupTime.getMinutes();
      this.rule.dayOfWeek = [];
      //convert the enabled days of week from object to array
      for (let i = 0; i < 7; i++) {
        if (settings.db_backup.days_of_week[i]) {
          this.rule.dayOfWeek.push(i)
        }
      }

      //execute scheduler
      this.backupSchedule = schedule.scheduleJob(this.rule, () => {
        this.backupDbCallback(settings);
      });

    }

  }

  async activate() {

    //fetch db backup settings
    let settings = await this.settingsLogic.getSettings();
    //activate the backup
    settings.db_backup.active = true;

    const backupTime = new Date(settings.db_backup.time);
    let lastUpdated = null;

    //apply the settings to the scheduler
    this.rule.hours = backupTime.getHours();
    this.rule.minute = backupTime.getMinutes();
    this.rule.dayOfWeek = [];
    //convert the enabled days of week from object to array
    for (let i = 0; i < 7; i++) {
      if (settings.db_backup.days_of_week[i]) {
        this.rule.dayOfWeek.push(i)
      }
    }

    //execute scheduler
    this.backupSchedule = schedule.scheduleJob(this.rule, () => {
      this.backupDbCallback(settings, lastUpdated);
    });

    return new Promise((resolve, reject) => {
      if (this.backupSchedule.nextInvocation()) {
        //settings.db_backup.last_updated = lastUpdated;
        //save settings
        this.settingsLogic.updateSettings(settings);
        resolve();
      } else {
        reject("unable to schedule a job.");
      }
    });
  }

  modifySchedule(time, days) {

  }

  async stop() {
    //fetch db backup settings
    let settings = await this.settingsLogic.getSettings();
    //activate the backup
    settings.db_backup.active = false;
    //cancel the job
    this.backupSchedule.cancel();

    return new Promise((resolve, reject) => {
      //basically if the next invocation date object is null
      //that means the job is cancelled
      if (!this.backupSchedule.nextInvocation()) {
        //save settings
        this.settingsLogic.updateSettings(settings);
        resolve("the job is cancelled.");
      } else {
        reject("unable to cancel scheduled job.");
      }
    });
  }

  async backupDbCallback(settings, lastUpdated) {
    //fetch db backup settings
    let fileToBackup = await this.ioLogic.readFile(settings.general.db_path);
    const date = new Date();
    this.ioLogic.writeFile(`${settings.db_backup.path}ndts-frms-db-backup-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.sqlite`, fileToBackup).then(() => {

    }).catch((error) => {
      console.log(error);
    });
    //console.log(lastUpdated);
    //set the last time the db backup was executed
    //lastUpdated = new Date();
  }

}

module.exports = DbBackupSvc;