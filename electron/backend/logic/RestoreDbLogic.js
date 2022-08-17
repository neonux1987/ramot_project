const LogicError = require("../customErrors/LogicError");
const SettingsLogic = require("../logic/SettingsLogic");
const path = require("path");

const EXT = "sqlite";

class RestoreDbLogic {
  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  async resetDB(withConfig) {
    const fse = require("fs-extra");
    const connectionPool = require("../connection/ConnectionPool");
    const SystemPaths = require("../system/SystemPaths");
    const AppLogic = require("./AppLogic");
    const appLogic = new AppLogic();

    // destroy connection
    await connectionPool.destroy();
    // remove old database
    await fse.remove(SystemPaths.paths.db_file_path);
    //  create new database file and run
    // migrations and seeds
    await connectionPool.createDbIfNoneExist();

    if (withConfig) {
      // remove old database
      await fse.remove(SystemPaths.paths.config_file_path);
      // create new config file
      await appLogic.createCleanSettingsFile();
    }
  }

  async restoreFromList(fileName, withConfig) {
    const backupSettings = await this.settingsLogic.getDbBackupSettings();

    const backupsFolder = backupSettings.db_backups_folder_path;
    const fullFilePath = path.join(backupsFolder, fileName);

    return await this.restore(fullFilePath, withConfig);
  }

  async restoreFromFile(filePath, withConfig) {
    return await this.restore(filePath, withConfig);
  }

  async restore(path, withConfig = true) {
    const FileType = require("file-type");
    const fse = require("fs-extra");
    const connectionPool = require("../connection/ConnectionPool");
    const { extractZip } = require("../../helpers/utils");
    const SystemPaths = require("../system/SystemPaths");

    const extractedFolderPath =
      SystemPaths.paths.app_temp_folder + "/extracted";
    const extractedDbFilePath = extractedFolderPath + "/ramot-group-db.sqlite";
    const extractedConfigFilePath = extractedFolderPath + "/config.json";

    await extractZip(path, extractedFolderPath);

    // if the db file is not a sqlite file, throw an error
    const sqliteFileType = await FileType.fromFile(extractedDbFilePath);
    if (sqliteFileType === undefined || sqliteFileType.ext !== EXT)
      throw new LogicError(`הקובץ שנבחר הוא לא קובץ בסיס נתונים מסוג ${EXT}`);

    // destroy database connection
    await connectionPool.destroy();

    // restore database from backup
    await fse.copy(extractedDbFilePath, SystemPaths.paths.db_file_path);

    // restore config from backup
    if (withConfig) {
      try {
        await extractedConfigFilePath;
        await fse.copy(
          extractedConfigFilePath,
          SystemPaths.paths.config_file_path
        );
      } catch (error) {
        throw new LogicError(
          "קרתה תקלה בזמן קריאת קובץ הגדרות ייתכן שהקובץ הוא לא מסוג json"
        );
      }
    }

    await fse.emptyDir(extractedFolderPath);
  }
}

module.exports = RestoreDbLogic;
