const path = require("path");
const fse = require("fs-extra");
const SystemPaths = require("../system/SystemPaths");

class SetupLogic {
  async firstTimeSetup() {
    try {
      const cp = require("../connection/ConnectionPool");

      const setupConfigPath = path.join(
        SystemPaths.paths.setup_folder_path,
        "setupConfig.json"
      );
      const setupConfigFile = await fse.readJson(setupConfigPath);

      if (setupConfigFile.firstTime) {
        // create a new db only if it do not exist!!!!!
        await cp.createDbIfNoneExist();

        await this.setLocations();

        setupConfigFile.firstTime = false;
        await fse.writeJSON(
          path.join(SystemPaths.paths.setup_folder_path, "setupConfig.json"),
          setupConfigFile
        );
      }
    } catch (error) {
      const LogicError = require("../customErrors/LogicError");
      throw new LogicError("First time setup failed.", "SetupLogic.js", error);
    }
  }

  async setLocations() {
    const config = await fse.readJson(SystemPaths.paths.config_file_path);

    config.user.reports_folder_path = SystemPaths.paths.user_reports_folder;

    config.system.db_file_path = SystemPaths.paths.db_file_path;
    config.system.db_folder_path = SystemPaths.paths.db_folder_path;
    config.system.config_folder_path = SystemPaths.paths.config_folder_path;
    config.system.config_file_path = SystemPaths.paths.config_file_path;
    config.system.logs_folder_path = SystemPaths.paths.logs_folder_path;
    config.system.log_file_path = SystemPaths.paths.log_file_path;

    config.db_backup.db_backups_folder_path =
      SystemPaths.paths.db_backups_folder_path;
    config.db_backup.backups_names_file_path =
      SystemPaths.paths.backups_names_file_path;

    config.locations.db_file_path = SystemPaths.paths.db_file_path;
    config.locations.db_folder_path = SystemPaths.paths.db_folder_path;
    config.locations.db_backups_folder_path =
      SystemPaths.paths.db_backups_folder_path;
    config.locations.reports_folder_path =
      SystemPaths.paths.reports_folder_path;
    config.locations.config_folder_path = SystemPaths.paths.config_folder_path;
    config.locations.config_file_path = SystemPaths.paths.config_file_path;
    config.locations.backups_names_file_path =
      SystemPaths.paths.backups_names_file_path;
    config.locations.logs_folder_path = SystemPaths.paths.logs_folder_path;
    config.locations.log_file_path = SystemPaths.paths.log_file_path;

    await fse.writeJSON(SystemPaths.paths.config_file_path, config);
  }
}

module.exports = SetupLogic;
