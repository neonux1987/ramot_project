const path = require("path");
const fse = require("fs-extra");
const SystemPaths = require("../system/SystemPaths");

const COPY_OPTIONS = {
  overwrite: false
};

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
        // create the dir structure for the config
        // files, db file etc...
        await fse.ensureDir(SystemPaths.paths.ramot_group_folder_path);
        await fse.ensureDir(SystemPaths.paths.config_folder_path);
        await fse.ensureDir(SystemPaths.paths.db_folder_path);
        await fse.ensureDir(SystemPaths.paths.db_backups_folder_path);
        await fse.ensureDir(SystemPaths.paths.user_main_folder);
        await fse.ensureDir(SystemPaths.paths.user_reports_folder);

        // copy configurations files to user system
        await fse.copy(
          path.join(SystemPaths.paths.setup_folder_path, "config/config.json"),
          SystemPaths.paths.config_file_path,
          COPY_OPTIONS
        );
        await fse.copy(
          path.join(
            SystemPaths.paths.setup_folder_path,
            "config/services.json"
          ),
          SystemPaths.paths.services_file_path,
          COPY_OPTIONS
        );
        await fse.copy(
          path.join(
            SystemPaths.paths.setup_folder_path,
            "config/backupsNames.json"
          ),
          SystemPaths.paths.backups_names_file_path,
          COPY_OPTIONS
        );

        // will create a new database file and
        // run migrations automatically
        cp.createDbIfNoneExist();

        await this.setLocations();

        setupConfigFile.firstTime = false;
        await fse.writeJSON(
          path.join(SystemPaths.paths.setup_folder_path, "setupConfig.json"),
          setupConfigFile
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setLocations() {
    const config = await fse.readJson(SystemPaths.paths.config_file_path);

    config.user.reports_folder_path = SystemPaths.paths.user_reports_folder;

    config.system.db_file_path = SystemPaths.paths.db_file_path;
    config.system.db_folder_path = SystemPaths.paths.db_folder_path;
    config.system.config_folder_path = SystemPaths.paths.config_folder_path;
    config.system.config_file_path = SystemPaths.paths.config_file_path;
    config.system.services_file_path = SystemPaths.paths.services_file_path;
    config.system.config_file_path = SystemPaths.paths.config_file_path;
    config.system.logs_folder_path = SystemPaths.paths.logs_folder_path;
    config.system.log_file_path = SystemPaths.paths.log_file_path;

    config.db_backup.db_backups_folder_path =
      SystemPaths.paths.db_backups_folder_path;
    config.db_backup.backups_names_file_path =
      SystemPaths.paths.backups_names_file_path;

    await fse.writeJSON(SystemPaths.paths.config_file_path, config);
  }
}

module.exports = SetupLogic;
