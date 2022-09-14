const LogicError = require("../customErrors/LogicError");
const SettingsLogic = require("../logic/SettingsLogic");
const path = require("path");

const DB_FILE_EXT = "sqlite";
const BACKUP_FILE_EXTENSION = "zip";

class RestoreDbLogic {
  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  async resetDB(withConfig) {
    const fse = require("fs-extra");
    const connectionPool = require("../connection/ConnectionPool");
    const SystemPaths = require("../system/SystemPaths");
    const AppLogic = require("./AppLogic");
    const SettingsLogic = require("../logic/SettingsLogic");
    const settingsLogic = new SettingsLogic();
    const appLogic = new AppLogic();

    // destroy connection
    await connectionPool.destroy();

    // remove old database
    await fse.remove(SystemPaths.paths.db_file_path);

    // prepare knex configuration
    await connectionPool.init();

    // create new database file and run
    // migrations and seeds
    await connectionPool.createDbIfNoneExist();

    if (withConfig) {
      // remove old database
      await fse.remove(SystemPaths.paths.config_file_path);
      // create new config file
      await appLogic.createCleanSettingsFile();
    }

    // when replacing the database, we also need
    // to purge the redux cache from old database data
    // otherwise it will throw errors on the client side
    await settingsLogic.updateSpecificSetting(
      SettingsLogic.SETTINGS_NAMES.REDUX,
      {
        purgeCache: true
      }
    );
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
    const SettingsLogic = require("../logic/SettingsLogic");
    const SetupLogic = require("../logic/SetupLogic");
    const setupLogic = new SetupLogic();
    const settingsLogic = new SettingsLogic();

    const extractedFolderPath =
      SystemPaths.paths.app_temp_folder + "/extracted";
    const extractedDbFilePath = extractedFolderPath + "/ramot-group-db.sqlite";
    const extractedConfigFilePath = extractedFolderPath + "/config.json";

    // if the db file is not a sqlite file, throw an error
    const zipFileType = await FileType.fromFile(path);
    if (zipFileType === undefined || zipFileType.ext !== BACKUP_FILE_EXTENSION)
      throw new LogicError(
        `הקובץ שנבחר הוא לא קובץ מסוג ${BACKUP_FILE_EXTENSION}`
      );

    await extractZip(path, extractedFolderPath);

    // if the db file is not a sqlite file, throw an error
    const sqliteFileType = await FileType.fromFile(extractedDbFilePath);
    if (sqliteFileType === undefined || sqliteFileType.ext !== DB_FILE_EXT)
      throw new LogicError(
        `הקובץ ב- zip הוא לא קובץ בסיס נתונים מסוג ${DB_FILE_EXT}`
      );

    // destroy database connection
    await connectionPool.destroy();

    // restore database from backup
    await fse.copy(extractedDbFilePath, SystemPaths.paths.db_file_path);

    // restore config from backup
    if (withConfig) {
      try {
        await fse.copy(
          extractedConfigFilePath,
          SystemPaths.paths.config_file_path
        );
        // after restore, update locations in
        // the restored config file
        await setupLogic.setLocations();

        const extractedConfigFile = await fse.readJSON(extractedConfigFilePath);
        const restoredConfigFile = await settingsLogic.getSettings();

        // because setLocations erases the user's chosed
        // db backups folder path, we need to take it from
        // the extracted config and override in the already
        // restored config
        restoredConfigFile.db_backup.db_backups_folder_path =
          extractedConfigFile.db_backup.db_backups_folder_path;
        restoredConfigFile.locations.db_backups_folder_path =
          extractedConfigFile.locations.db_backups_folder_path;

        await settingsLogic.updateSettings(restoredConfigFile);
      } catch (error) {
        throw new LogicError(
          "קרתה תקלה בזמן קריאת קובץ הגדרות ייתכן שהקובץ הוא לא מסוג json"
        );
      }
    }

    await fse.remove(extractedFolderPath);

    // when replacing the database, we also need
    // to purge the redux cache from old database data
    // otherwise it will throw errors on the client side
    await settingsLogic.updateSpecificSetting(
      SettingsLogic.SETTINGS_NAMES.REDUX,
      {
        purgeCache: true
      }
    );
  }
}

module.exports = RestoreDbLogic;
