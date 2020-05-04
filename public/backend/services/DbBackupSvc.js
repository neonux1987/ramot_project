const fse = require('fs-extra');
const schedule = require('node-schedule');
const SettingsLogic = require('../logic/SettingsLogic');
const RegisteredBackupsLogic = require('../logic/RegisteredBackupsLogic');
const rendererNotificationSvc = require('./RendererNotificationSvc');

const DB_BACKUP_FILENAME = "mezach-db-backup";

class DbBackupSvc {

  constructor() {

    this.settingsLogic = new SettingsLogic();
    this.registeredBackupsLogic = new RegisteredBackupsLogic();
    this.rule = new schedule.RecurrenceRule();
    this.backupSchedule = null;
  }

  async init() {

    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }

    if (settings.db_backup.enabled) {
      const backupTime = new Date(settings.db_backup.time);

      //apply the settings to the scheduler
      this.rule.hour = backupTime.getHours();
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
      this.backupSchedule = schedule.scheduleJob(this.rule, this.schedulerCallback);

      if (this.backupSchedule.nextInvocation() === null) {
        return Promise.reject();
      }
      return Promise.resolve();
    }

  }

  async start() {
    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }

    //check if none of te days are selected, if none
    //selected, don't allow to start the backup service
    const valid = this.validateDaysOfWeek(settings.db_backup.days_of_week);
    if (!valid) {
      return Promise.reject(new Error("לא ניתן להפעיל את שירות הגיבוי של בסיס הנתונים אם לא בחרת לפחות יום אחד וביצעת שמירה."));
    }

    const backupTime = new Date(settings.db_backup.time);

    // apply the settings to the scheduler
    this.rule.hour = backupTime.getHours();
    this.rule.minute = backupTime.getMinutes();
    this.rule.dayOfWeek = [];
    // convert the enabled days of week from object to array
    // for the scheduler
    for (let i = 0; i < 7; i++) {
      if (settings.db_backup.days_of_week[i]) {
        this.rule.dayOfWeek.push(i)
      }
    }

    // if non of the days selected, we must
    // set the dayOfWeek to null otherwise
    // the node-schedule module will crash for some reason
    if (this.rule.dayOfWeek.length === 0) {
      this.rule.dayOfWeek = null;
    }

    // execute scheduler
    this.backupSchedule = schedule.scheduleJob(this.rule, this.schedulerCallback);

    if (this.backupSchedule.nextInvocation() === null) {
      return Promise.reject();
    }
    //return this.settingsLogic.updateSettings(settings);
  }

  async stop() {
    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }

    //make sure that the scheduler object in not null
    if (this.backupSchedule === null) {
      return Promise.reject(new Error("לא ניתן להפעיל את שירות הגיבוי של בסיס הנתונים אם לא בחרת לפחות יום אחד וביצעת שמירה."));
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

  async restart() {
    // only restart the service if it's enabled
    if (this.backupSchedule) {
      await this.stop();
      await this.start();
    }
  }

  isRunning() {
    return this.backupSchedule === null ? false : true;
  }

  schedulerCallback = async () => {
    //notify that the backup process started
    rendererNotificationSvc.notifyRenderer("notify-renderer", "dbBackupStarted", "המערכת מבצעת גיבוי של בסיס הנתונים...");

    await this.initiateBackup().catch((error) => {
      console.log(error);
      rendererNotificationSvc.notifyRenderer("notify-renderer", "dbBackupError", "קרתה תקלה, הגיבוי נכשל.");
    });

    //notify that the backup process ended
    rendererNotificationSvc.notifyRenderer("notify-renderer", "dbBackupFinished", "גיבוי בסיס הנתונים הסתיים בהצלחה.");
  }

  async initiateBackup() {
    //fetch db backup settings
    let settings = await this.settingsLogic.getSettings();

    const { db_backup, locations } = settings;

    //fetch db backup settings
    const registeredBackups = await this.registeredBackupsLogic.getRegisteredBackups();

    //current date
    let date = new Date();
    //convert date to local date he-il to
    //get the correct time
    const dateLocalString = date.toLocaleString();
    //set the curret time in the new date
    date = new Date(dateLocalString);

    //filename of the file to save
    const fileName = `${DB_BACKUP_FILENAME}-D-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-T-${date.getHours()}-${date.getMinutes()}.sqlite`;
    const path = `${db_backup.path}/${fileName}`;

    if (registeredBackups.length >= db_backup.backups_to_save) {

      //filename of the file to remove, the first and oldest in the array
      const removedFileName = registeredBackups[0].fileName;

      //remove the file physically from the drive
      await fse.remove(`${db_backup.path}/${removedFileName}`);

      //remove the filename from the array
      registeredBackups.shift();

    }

    //write the file physically to the drive
    await fse.copy(locations.db_file_path, path);

    //push the new file to the array
    registeredBackups.push({ backupDateTime: date, fileName: fileName });

    //save it to the settings obj
    settings.db_backup.last_update = date.toString();

    //write the new settings
    await this.settingsLogic.updateSettings(settings);

    await this.registeredBackupsLogic.updateRegisteredBackups(registeredBackups);

  }


  async independentBackup(fullPath) {

    if (!fullPath) {
      throw new Error("the path can not be null or undefined.")
    }

    //fetch db backup settings
    let settings = await this.settingsLogic.getSettings();

    //fetch db backup settings
    let fileToBackup = await fse.readFile(settings.locations.db_file_path);

    //write the file physically to the drive
    await fse.writeFile(fullPath, fileToBackup);

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