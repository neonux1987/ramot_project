const fse = require('fs-extra');
const SettingsLogic = require('./SettingsLogic');
const RegisteredBackupsLogic = require('./RegisteredBackupsLogic');
const ServiceError = require('../customErrors/ServiceError');
const connectionPool = require('../connection/ConnectionPool');
const logManager = require('../logger/LogManager');
const DbError = require('../customErrors/DbError');
const SystemPaths = require('../system/SystemPaths');

const FILENAME = "DbBackupSvc.js";

const DB_BACKUP_FILENAME = SystemPaths.info.db_file_name;

class BackupLogic {

  constructor() {
    this.logger = logManager.getLogger();
    this.settingsLogic = new SettingsLogic();
    this.registeredBackupsLogic = new RegisteredBackupsLogic();
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

  async initiateBackup(settings) {
    await this.checkDbHealth();

    if (settings === undefined)
      //fetch db backup settings
      settings = await this.settingsLogic.getSettings();

    const { db_backup, system } = settings;

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
    const path = `${db_backup.db_backups_folder_path}/${fileName}`;

    if (registeredBackups.length >= db_backup.backups_to_save) {

      //filename of the file to remove, the first and oldest in the array
      const removedFileName = registeredBackups[0].fileName;

      //remove the file physically from the drive
      await fse.remove(`${db_backup.db_backups_folder_path}/${removedFileName}`);

      //remove the filename from the array
      registeredBackups.shift();

    }

    //write the file physically to the drive
    await fse.copy(system.db_file_path, path);

    //push the new file to the array
    registeredBackups.push({ backupDateTime: date, fileName: fileName });

    //save it to the settings obj
    settings.db_backup.last_update = date.toJSON();

    settings.db_backup.byTime.executed_backups++;

    //write the new settings
    await this.settingsLogic.updateSettings(settings);

    await this.registeredBackupsLogic.updateRegisteredBackups(registeredBackups);
  }


  async independentBackup(fullPath) {
    await this.checkDbHealth();

    if (!fullPath) {
      const newError = new ServiceError("המיקום של התיקייה לא תקין", FILENAME, error);
      this.logger.error(newError.toString())
      throw newError;
    }

    //fetch db backup settings
    let systemSettings = await this.settingsLogic.getSystemSettings();

    //fetch db backup settings
    let fileToBackup = await fse.readFile(systemSettings.db_file_path);

    //write the file physically to the drive
    await fse.writeFile(fullPath, fileToBackup);
  }

}

module.exports = new BackupLogic();