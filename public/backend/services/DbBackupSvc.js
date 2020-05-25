const fse = require('fs-extra');
const schedule = require('node-schedule');
const SettingsLogic = require('../logic/SettingsLogic');
const RegisteredBackupsLogic = require('../logic/RegisteredBackupsLogic');
const ServiceError = require('../customErrors/ServiceError');
const connectionPool = require('../connection/ConnectionPool');
const logManager = require('../logger/LogManager');
const rendererNotificationSvc = require('./RendererNotificationSvc');
const DbError = require('../customErrors/DbError');

const FILENAME = "DbBackupSvc.js";

const DB_BACKUP_FILENAME = "mezach-db-backup";

class DbBackupSvc {

  constructor() {
    this.logger = logManager.getLogger();
    this.settingsLogic = new SettingsLogic();
    this.registeredBackupsLogic = new RegisteredBackupsLogic();
    this.rule = new schedule.RecurrenceRule();
    this.backupSchedule = null;
  }

  async start() {
    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (error) {
      const newError = new ServiceError(e.message, FILENAME, error);
      this.logger.error(newError.toString())
      throw newError;
    }

    const {
      days_of_week,
      time,
      byHour,
      byTime,
      every_x_hours
    } = settings.db_backup;

    //check if none of the days are selected, if none
    //selected, don't allow to start the backup service
    const valid = this.validateDaysOfWeek(days_of_week);
    if (!valid) {
      return Promise.reject(new Error("לא ניתן להפעיל את שירות הגיבוי של בסיס הנתונים אם לא בחרת לפחות יום אחד וביצעת שמירה."));
    }

    this.rule = new schedule.RecurrenceRule();

    this.rule.dayOfWeek = [];
    if (byTime) {
      const backupTime = new Date(time);
      // apply the settings to the scheduler
      this.rule.hour = backupTime.getHours();
      this.rule.minute = backupTime.getMinutes();
    } else if (byHour) {
      this.rule.hour = every_x_hours;
      this.rule.minute = 0;
    }

    // convert the enabled days of week from object to array
    // for the scheduler
    for (let i = 0; i < 7; i++) {
      if (days_of_week[i]) {
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
      this.rule = null;
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

    await this.initiateBackup()
      .then(() => {
        //notify that the backup process ended
        rendererNotificationSvc.notifyRenderer("notify-renderer", "dbBackupFinished", "גיבוי בסיס הנתונים הסתיים בהצלחה.");
      })
      .catch((error) => {
        rendererNotificationSvc.notifyRenderer("notify-renderer", "dbBackupError", error.message);
        const newError = new ServiceError("המערכת נכשלה בגיבוי בסיס הנתונים.", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });

  }

  /****************************************************
   * check if the database is working, if the file
   * is not corrupt, if it's corrupt or not working
   * dont back it up
  *****************************************************/
  async checkDbHealth() {
    const connection = await connectionPool.getConnection();
    return await connection('buildings').count()
      .catch((error) => {
        const msg = `
        הגיבוי נכשל. יש חשד שהבסיס נתונים  פגום. המערכת לא תדרוס את הגיבויים הקודמים
        מכיוון שהם עדיין תקינים ויכולים לשמש לצורך שיחזור.
        `;
        const newError = new DbError(msg, FILENAME, error);
        throw newError;
      });
  }

  async initiateBackup() {
    await this.checkDbHealth();

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
    const fileName = `${DB_BACKUP_FILENAME}-D-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-T-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.sqlite`;
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
      const newError = new ServiceError("המיקום של התיקייה לא תקין", FILENAME, error);
      this.logger.error(newError.toString())
      throw newError;
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