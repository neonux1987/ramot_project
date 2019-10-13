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

    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }

    if (settings.db_backup.active) {
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

      return new Promise((resolve, reject) => {
        //execute scheduler
        this.backupSchedule = schedule.scheduleJob(this.rule, () => {
          this.backupDbCallback(settings).then(() => {
            resolve();
          }).catch((error) => {
            reject(error);
          });
        });
      });
    }
  }

  async activate() {
    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }

    //check if none of te days are selected, if none
    //selected, don't allow to activate the backup service
    const valid = this.validateDaysOfWeek(settings.db_backup.days_of_week);
    if (!valid) {
      return Promise.reject(new Error("לא ניתן להפעיל את שירות הגיבוי של בסיס הנתונים אם לא בחרת לפחות יום אחד וביצעת שמירה."));
    }

    //activate the backup
    settings.db_backup.active = true;

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

    return new Promise((resolve, reject) => {
      //execute scheduler
      this.backupSchedule = schedule.scheduleJob(this.rule, () => {
        this.backupDbCallback(settings).then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

  async modifySchedule() {
    let settings = null;
    try {
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();
    } catch (e) {
      return Promise.reject(e);
    }

    //dont do anything if the db backup is 
    //not active
    if (!settings.db_backup.active) {
      return Promise.resolve();
    }

    //cancel the job
    this.backupSchedule.cancel();
    this.backupSchedule = null;

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

    return new Promise((resolve, reject) => {
      //execute scheduler
      this.backupSchedule = schedule.scheduleJob(this.rule, () => {
        this.backupDbCallback(settings).then(() => {
          resolve();
        }).catch((error) => {
          rendererNotificationSvc.notifyRenderer("dbBackupError", "קרתה תקלה, הגיבוי נכשל.").then(() => {
            reject(error);
          }).catch(() => reject(error));

        });
      });
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
    settings.db_backup.active = false;

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

  async backupDbCallback(settings) {
    const { db_backup, general } = settings;

    //fetch db backup settings
    let fileToBackup = await this.ioLogic.readFile(general.db_path);

    //current date
    let date = new Date();
    //convert date to local date he-il to
    //get the correct time
    const dateLocalString = date;
    //set the curret time in the new date
    date = new Date(dateLocalString);

    //filename of the file to save
    const fileName = `${DB_BACKUP_FILENAME}-D-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-T-${date.getHours()}-${date.getMinutes()}.sqlite`;
    const path = `${db_backup.path}/${fileName}`;

    try {
      //notify that the backup process started
      await rendererNotificationSvc.notifyRenderer("dbBackupStarted", "מתבצע כעת גיבוי בסיס נתונים...");
      console.log(db_backup);
      if (db_backup.saved_backups.length < db_backup.backups_to_save) {

        //write the file physically to the drive
        await this.ioLogic.writeFile(path, fileToBackup);

        //push the new file to the array
        db_backup.saved_backups.push(fileName);

        console.log("inside if");
      } else {


        //filename of the file to remove, the first and oldest in the array
        const removedFileName = db_backup.saved_backups[0];
        console.log("inside else");
        console.log(`${db_backup.path}/${removedFileName}`);
        //remove the file physically from the drive
        await this.ioLogic.removeFile(`${db_backup.path}/${removedFileName}`);

        //remove the filename from the array
        db_backup.saved_backups.shift();

        //write the file physically to the drive
        await this.ioLogic.writeFile(path, fileToBackup);

        //push the new file to the array
        db_backup.saved_backups.push(fileName);
      }

      //save it to the settings obj
      settings.db_backup.last_update = date.toString();

      //write the new settings
      await this.settingsLogic.updateSettings(settings);

      //notify that the backup process ended
      await rendererNotificationSvc.notifyRenderer("dbBackupFinished", "גיבוי בסיס הנתונים הסתיים בהצלחה.");

    } catch (e) {
      throw new Error(e);
    }

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