const fse = require("fs-extra");
const LogicError = require("../customErrors/LogicError");
const SystemPaths = require("../system/SystemPaths");

const CONFIG_BACKUPS_NAMES = SystemPaths.paths.backups_names_file_path;

class RegisteredBackupsLogic {
  getRegisteredBackups() {
    return fse.readJSON(CONFIG_BACKUPS_NAMES);
  }

  async ensureConfigFileExistAndCreate() {
    try {
      // will throw and error if settings file do not exist
      await this.getRegisteredBackups();
    } catch (error) {
      if (error.message.includes("ENOENT") === false)
        throw new LogicError(
          "קיימת בעיה בקריאה של קובץ הגדרות רשימת גיבויים",
          "RegisteredBackupsLogic.js",
          error
        );

      const SetupLogic = require("./SetupLogic");
      const setupLogic = new SetupLogic();

      await setupLogic.createCleanBackupsNamesConfigFile();
    }
  }

  updateRegisteredBackups(data) {
    return fse.writeJSON(CONFIG_BACKUPS_NAMES, data, {
      spaces: 2
    });
  }

  initializeBackupsList() {
    return this.updateRegisteredBackups([]);
  }
}

module.exports = RegisteredBackupsLogic;
