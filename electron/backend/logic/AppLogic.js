const fse = require("fs-extra");
const SystemPaths = require("../system/SystemPaths");

class AppLogic {
  async ensureAppFoldersAndConfigFiles() {
    await this.ensureAppFoldersExist();

    // create config.json if not exist
    await this.createCleanSettingsFile();

    // create backupsNames.json if not exist
    await this.createCleanBackupsNamesConfigFile();
  }

  async ensureAppFoldersExist() {
    await fse.ensureDir(SystemPaths.paths.ramot_group_folder_path);
    await fse.ensureDir(SystemPaths.paths.config_folder_path);
    await fse.ensureDir(SystemPaths.paths.db_folder_path);
    await fse.ensureDir(SystemPaths.paths.db_backups_folder_path);
    await fse.ensureDir(SystemPaths.paths.app_temp_folder);
  }

  async createCleanSettingsFile() {
    const exists = await fse.pathExists(SystemPaths.paths.config_file_path);

    if (exists) return false;

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

    await fse.writeJson(SystemPaths.paths.config_file_path, cleanConfig);

    return true;
  }

  async createCleanBackupsNamesConfigFile() {
    const exists = await fse.pathExists(
      SystemPaths.paths.backups_names_file_path
    );

    if (exists) return;

    const cleanConfig = [];

    await fse.writeJson(SystemPaths.paths.backups_names_file_path, cleanConfig);

    await this.ensureConfigFileExistAndCreate();
  }

  async ensureConfigFileExistAndCreate() {
    const SettingsLogic = require("./SettingsLogic");
    const RegisteredBackupsLogic = require("./RegisteredBackupsLogic");
    const settingsLogic = new SettingsLogic();
    const registeredBackupsLogic = new RegisteredBackupsLogic();

    const files = await fse.readdir(SystemPaths.paths.db_backups_folder_path);

    const backups = [];

    if (files.length > 0) {
      files.forEach((fileName) => {
        const date = parseDate(fileName);

        const payload = {
          backupDateTime: date.toString(),
          fileName
        };

        backups.push(payload);
      });

      // sort the backups by date,
      // make the newest date last
      backups.sort((a, b) => {
        const dateA = new Date(a.backupDateTime);
        const dateB = new Date(b.backupDateTime);
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }

        return 0;
      });

      // update settings in config file
      await settingsLogic.updateSpecificSetting(
        SettingsLogic.SETTINGS_NAMES.DB_BACKUP,
        {
          last_update: backups[backups.length - 1].backupDateTime,
          executed_backups: backups.length
        }
      );
    }

    await registeredBackupsLogic.updateRegisteredBackups(backups);
  }
}

function parseDate(filename) {
  const dIndex = filename.indexOf("D");
  const tIndex = filename.indexOf("T");
  const dotIndex = filename.indexOf(".");

  let date = new Date();

  // date
  const extractedDateString = filename.slice(dIndex + 2, tIndex - 1);
  const dateArr = extractedDateString.split("-");
  date.setFullYear(Number.parseInt(dateArr[2]));
  date.setMonth(Number.parseInt(dateArr[1] - 1));
  date.setDate(Number.parseInt(dateArr[0]));

  // time
  const extractedTimeString = filename.slice(tIndex + 2, dotIndex);
  const timeArr = extractedTimeString.split("-");
  date.setHours(Number.parseInt(timeArr[0]));
  date.setMinutes(Number.parseInt(timeArr[1]));
  date.setSeconds(Number.parseInt(timeArr[2]));

  // convert date to local date he-il to
  // get the correct time gmt time +3 or +2
  //date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  return date;
}

module.exports = AppLogic;
