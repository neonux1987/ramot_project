const LogicError = require("../customErrors/LogicError");
const SettingsLogic = require("../logic/SettingsLogic");
const path = require("path");

const EXT = "sqlite";

class RestoreDbLogic {
  constructor() {
    this.settingsLogic = new SettingsLogic();
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
      SystemPaths.paths.db_backups_folder_path + "/extracted";
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
  }
}

module.exports = RestoreDbLogic;
