const { app, BrowserWindow } = require('electron');
const FileType = require('file-type');
const fse = require('fs-extra');
const LogicError = require('../customErrors/LogicError');
const connectionPool = require('../connection/ConnectionPool');
const ServicesLogic = require('../logic/ServicesLogic');
const SettingsLogic = require('../logic/SettingsLogic');
const path = require('path');

const EXT = "sqlite";
const DB_BACKUP_FILENAME = "mezach-db-backup-D-";

class RestoreDbLogic {

  constructor() {
    this.servicesLogic = new ServicesLogic();
    this.settingsLogic = new SettingsLogic();
  }

  async restoreFromList(fileName) {
    const locations = await this.settingsLogic.getLocationsSettings();

    const backupsFolder = locations.db_backups_folder_path;
    const fullFilePath = path.join(backupsFolder, fileName);

    return this.restore(fullFilePath);
  }

  async restoreFromFile(filePath) {
    return restore(filePath);
  }

  async restore(path) {
    const fileType = await FileType.fromFile(path);
    if (fileType === undefined || fileType.ext !== EXT)
      throw new LogicError(`הקובץ שבחרת הוא לא קובץ בסיס נתונים מסוג ${EXT}`);

    await this.servicesLogic.stopAllServices();
    await connectionPool.destroy();

    const locations = await this.settingsLogic.getLocationsSettings();

    // replace the old database 
    await fse.copy(path, locations.db_file_path);
  }

}

module.exports = RestoreDbLogic;