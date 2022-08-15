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

      const SettingsLogic = require("./SettingsLogic");
      const settingsLogic = new SettingsLogic();

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
        // make the newest date first
        backups.sort((a, b) => {
          const dateA = new Date(a.backupDateTime);
          const dateB = new Date(b.backupDateTime);
          if (dateB < dateA) {
            return -1;
          }
          if (dateB > dateA) {
            return 1;
          }

          return 0;
        });

        // update settings in config file
        await settingsLogic.updateSpecificSetting(
          SettingsLogic.SETTINGS_NAMES.DB_BACKUP,
          {
            last_update: backups[0].backupDateTime,
            executed_backups: backups.length
          }
        );
      }

      await this.updateRegisteredBackups(backups);
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

module.exports = RegisteredBackupsLogic;
