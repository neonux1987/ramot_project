const path = require('path');
const fse = require('fs-extra');
const SystemPaths = require('../system/SystemPaths');

const COPY_OPTIONS = {
  overwrite: false
};

class SetupLogic {

  async firstTimeSetup() {
    try {
      const setupConfigPath = path.join(SystemPaths.paths.setup_folder_path, "setupConfig.json");
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
        await fse.copy(path.join(SystemPaths.paths.setup_folder_path, "config/config.json"), SystemPaths.paths.config_file_path, COPY_OPTIONS);
        await fse.copy(path.join(SystemPaths.paths.setup_folder_path, "config/services.json"), SystemPaths.paths.services_file_path, COPY_OPTIONS);
        await fse.copy(path.join(SystemPaths.paths.setup_folder_path, "config/backupsNames.json"), SystemPaths.paths.backups_names_file_path, COPY_OPTIONS);

        //copy clean database file to user system
        await fse.copy(path.join(SystemPaths.paths.setup_folder_path, "db", `${SystemPaths.info.db_file_name}.sqlite`), SystemPaths.paths.db_file_path, COPY_OPTIONS);

        await this.setLocations();

        setupConfigFile.firstTime = false;
        await fse.writeJSON(path.join(SystemPaths.paths.setup_folder_path, "setupConfig.json"), setupConfigFile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setLocations() {
    const config = await fse.readJson(SystemPaths.paths.config_file_path);

    config.locations.db_file_path = SystemPaths.paths.db_file_path;
    config.locations.db_folder_path = SystemPaths.paths.db_folder_path;

    config.locations.db_backups_folder_path = SystemPaths.paths.db_backups_folder_path;
    config.db_backup.path = SystemPaths.paths.db_backups_folder_path;

    config.locations.reports_folder_path = SystemPaths.paths.user_reports_folder;

    config.locations.config_folder_path = SystemPaths.paths.config_folder_path;
    config.locations.config_file_path = SystemPaths.paths.config_file_path;
    config.locations.services_file_path = SystemPaths.paths.services_file_path;
    config.locations.backups_names_file_path = SystemPaths.paths.backups_names_file_path;

    config.locations.logs_folder_path = SystemPaths.paths.logs_folder_path;
    config.locations.log_file_path = SystemPaths.paths.log_file_path;

    await fse.writeJSON(SystemPaths.paths.config_file_path, config);
  }

}

module.exports = SetupLogic;