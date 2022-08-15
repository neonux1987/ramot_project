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
        // create the dir structure for the config
        // files, db file etc...
        await fse.ensureDir(SystemPaths.paths.ramot_group_folder_path);
        await fse.ensureDir(SystemPaths.paths.config_folder_path);
        await fse.ensureDir(SystemPaths.paths.db_folder_path);
        await fse.ensureDir(SystemPaths.paths.db_backups_folder_path);
        await fse.ensureDir(SystemPaths.paths.user_main_folder);
        await fse.ensureDir(SystemPaths.paths.user_reports_folder);

        // create clean config file in the config file path location
        await this.createCleanSettingsFile();

        await this.createCleanBackupsNamesConfigFile(
          SystemPaths.paths.backups_names_file_path
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

  async createCleanSettingsFile() {
    const cleanConfig = {
      user: {
        reports_folder_path: ""
      },
      system: {
        soundEnabled: true,
        soundVolume: 0.15,
        config_folder_path: "",
        db_file_path: "",
        db_folder_path: "",
        config_file_path: "",
        logs_folder_path: "",
        log_file_path: ""
      },
      notifications: {
        enabled: false,
        toastContainerProps: {
          width: "340px",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          newestOnTop: false,
          rtl: true,
          pauseOnVisibilityChange: true,
          draggable: false,
          pauseOnHover: true
        }
      },
      theme: {
        mainColors: {
          primary: "#0066a2",
          darkBlue: "#2b3a4a"
        },
        colorSet: {
          0: "#6f7bd8",
          1: "#1d8fd2",
          2: "#1fcc9b",
          3: "#ff094d",
          4: "#ff7100"
        },
        defaultColorSet: {
          0: "#6f7bd8",
          1: "#1d8fd2",
          2: "#1fcc9b",
          3: "#ff094d",
          4: "#ff7100"
        },
        sticky_toolbar: false
      },
      db_backup: {
        backups_to_save: 2,
        byTime: {
          currentDate: "",
          executed_backups: 0,
          day_max_allowed_backups: 2,
          every_x_hours: 1,
          enabled: false
        },
        enabled: true,
        last_update: "",
        max_num_of_history_backups: 7,
        restart_required: true,
        backup_on_exit: true,
        currentDate: "",
        executed_backups: 0,
        db_backups_folder_path: "",
        backups_names_file_path: ""
      },
      empty_reports_generator: {
        enabled: false,
        restartRequired: false
      },
      appUpdates: {
        availableUpdate: false,
        updateVersion: "",
        releaseDate: "",
        updateDownloaded: false,
        userNotified: true,
        updateFilePath: ""
      },
      db_restore: {
        last_update: ""
      },
      locations: {
        db_file_path: "",
        db_folder_path: "",
        db_backups_folder_path: "",
        reports_folder_path: "",
        config_folder_path: "",
        config_file_path: "",
        backups_names_file_path: "",
        logs_folder_path: "",
        log_file_path: ""
      }
    };

    await fse.ensureDir(SystemPaths.paths.config_folder_path);

    return fse.writeJson(SystemPaths.paths.config_file_path, cleanConfig);
  }

  async createCleanBackupsNamesConfigFile() {
    const cleanConfig = [];
    return fse.writeJson(
      SystemPaths.paths.backups_names_file_path,
      cleanConfig
    );
  }
}

module.exports = SetupLogic;
