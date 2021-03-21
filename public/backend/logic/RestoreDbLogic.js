const LogicError = require('../customErrors/LogicError');
const SettingsLogic = require('../logic/SettingsLogic');
const path = require('path');

const EXT = "sqlite";

class RestoreDbLogic {

  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  async restoreFromList(fileName) {

    const backupSettings = await this.settingsLogic.getDbBackupSettings();

    const backupsFolder = backupSettings.db_backups_folder_path;
    const fullFilePath = path.join(backupsFolder, fileName);
    //throw new Error("yes")
    //return await this.restore(fullFilePath);
  }

  async restoreFromFile(filePath) {
    return await this.restore(filePath);
  }

  async restore(path) {
    const FileType = require('file-type');
    const fse = require('fs-extra');
    const connectionPool = require('../connection/ConnectionPool');

    const fileType = await FileType.fromFile(path);
    if (fileType === undefined || fileType.ext !== EXT)
      throw new LogicError(`הקובץ שבחרת הוא לא קובץ בסיס נתונים מסוג ${EXT}`);

    await connectionPool.destroy();

    const systemSettings = await this.settingsLogic.getSystemSettings();

    // replace the old database 
    await fse.copy(path, systemSettings.db_file_path);
  }

}

module.exports = RestoreDbLogic;