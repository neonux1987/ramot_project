const schedule = require('node-schedule');
const SettingsLogic = require('../logic/SettingsLogic');
const IOLogic = require('../logic/IOLogic');
const rendererNotificationSvc = require('./RendererNotificationSvc');

const DB_BACKUP_FILENAME = "ndts-frms-db-backup";

class DbBackupSvc {

  constructor() {

    this.settingsLogic = new SettingsLogic();
    this.ioLogic = new IOLogic();
    this.rule = new schedule.RecurrenceRule();
    this.backupSchedule = null;
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
      //if non of the days selected, we must
      //set the dayOfWeek to null otherwise
      //the node-schedule module will crash for some reason
      if (this.rule.dayOfWeek.length === 0) {
        this.rule.dayOfWeek = null;
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

    //check if none of te days are selected, if none
    //selected, don't allow to activate the backup service
    const valid = this.validateDaysOfWeek(settings.db_backup.days_of_week);
    if (!valid) {
      return Promise.reject(new Error("לא ניתן להפעיל את שירות הגיבוי של בסיס הנתונים אם לא בחרת לפחות יום אחד וביצעת שמירה."));
    }

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

    //if non of the days selected, we must
    //set the dayOfWeek to null otherwise
    //the node-schedule module will crash for some reason
    if (this.rule.dayOfWeek.length === 0) {
      this.rule.dayOfWeek = null;
    }

    //execute scheduler
    this.backupSchedule = schedule.scheduleJob(this.rule, () => {
      this.backupDbCallback(settings, lastUpdated);
    });

    if (this.backupSchedule.nextInvocation()) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("unable to schedule a job."));
    }
  }

  modifySchedule(settings) {
    //dont do anything if the db backup is 
    //not active
    if (!settings.db_backup.active) {
      return Promise.resolve();
    }

    //cancel the job
    this.backupSchedule.cancel();
    this.backupSchedule = null;

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

    //if non of the days selected, we must
    //set the dayOfWeek to null otherwise
    //the node-schedule module will crash for some reason
    if (this.rule.dayOfWeek.length === 0) {
      this.rule.dayOfWeek = null;
    }
    console.log(this.rule);
    //execute scheduler
    this.backupSchedule = schedule.scheduleJob(this.rule, () => {
      this.backupDbCallback(settings, lastUpdated);
    });

    return new Promise((resolve, reject) => {
      if (this.backupSchedule.nextInvocation()) {
        resolve();
      } else {
        reject("unable to change the schedule.");
      }
    });

  }

  async stop() {
    //fetch db backup settings
    let settings = await this.settingsLogic.getSettings();
    //activate the backup
    settings.db_backup.active = false;

    //make sure that the scheduler object in not null
    if (this.backupSchedule === null) {
      return Promise.reject(new Error("לא ניתן להפעיל את שירות הגיבוי של בסיס הנתונים אם לא בחרת לפחות יום אחד וביצעת שמירה."));
    }

    //cancel the job
    this.backupSchedule.cancel();

    return new Promise((resolve, reject) => {
      //basically if the next invocation date object is null
      //that means the job is cancelled
      if (!this.backupSchedule.nextInvocation()) {
        //init scheduler
        this.backupSchedule = null;
        //save settings
        this.settingsLogic.updateSettings(settings);
        resolve("the job is cancelled.");
      } else {
        reject("unable to cancel scheduled job.");
      }
    });
  }

  async backupDbCallback(settings) {

    const { db_backup, general } = settings;

    //fetch db backup settings
    let fileToBackup = await this.ioLogic.readFile(general.db_path);

    //current date
    let date = new Date();

    //filename of thefile to save
    const fileName = `${DB_BACKUP_FILENAME}-D-${date.getDay()}-${date.getDate()}-${date.getFullYear()}-T-${date.getHours()}-${date.getMinutes()}.sqlite`;

    //handle last update
    const dateLocalString = date.toLocaleString("he-IL");
    date = new Date(dateLocalString);

    //notify that the backup process started
    rendererNotificationSvc.notifyRenderer("dbBackupStarted", "מתבצע כעת גיבוי בסיס נתונים...");

    if (db_backup.saved_backups.length <= db_backup.backups_to_save) {

      //push the new file to the array
      db_backup.saved_backups.push(fileName);

      //write the file physically to the drive
      this.saveDbFile(`${db_backup.path}/${fileName}`, settings, fileToBackup, date, rendererNotificationSvc);

    } else {

      //remove the filename from the array
      const removedFileName = db_backup.saved_backups.shift();

      //remove the file physically from the drive
      this.ioLogic.removeFile(`${db_backup.path}/${removedFileName}`)
        .then(() => {
          //push the new file to the array
          db_backup.saved_backups.push(fileName);

          //write the file physically to the drive
          this.saveDbFile(`${db_backup.path}/${fileName}`, settings, fileToBackup, date, rendererNotificationSvc);

        }).catch((error) => {
          console.log(error);
          throw error;
        });

    }

  }

  saveDbFile(path, settings, fileToBackup, date, rendererNotificationSvc) {

    //write the file physically to the drive
    this.ioLogic.writeFile(path, fileToBackup).then(() => {

      //save it to the settings obj
      settings.db_backup.last_update = date.toString();

      //write the new settings
      this.settingsLogic.updateSettings(settings);

      //notify that the backup process ended
      rendererNotificationSvc.notifyRenderer("dbBackupFinished", "גיבוי בסיס הנתונים הסתיים בהצלחה.");
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }

  async independentBackup(fullPath) {
    console.log(fullPath);
    if (fullPath) {

      console.log("yes");
      return Promise.resolve();
    } else {
      return Promise.reject("something went wrong!")
    }
  }

  validateDaysOfWeek(daysOfWeek) {
    const keys = Object.keys(daysOfWeek);
    let valid = false;
    for (let i = 0; i < keys.length; i++) {
      if (daysOfWeek[keys[i]]) {
        valid = true;
      }
    }
    return valid;
  }

}

module.exports = new DbBackupSvc();