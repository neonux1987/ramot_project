const fse = require("fs-extra");
const SystemPaths = require("../system/SystemPaths");

const CONFIG_BACKUPS_NAMES = SystemPaths.paths.backups_names_file_path;
const BACKUPS_FOLDER_PATH = SystemPaths.paths.db_backups_folder_path;

class RegisteredBackupsLogic {
  getRegisteredBackups() {
    return fse.readJSON(CONFIG_BACKUPS_NAMES);
  }

  updateRegisteredBackups(data) {
    return fse.writeJSON(CONFIG_BACKUPS_NAMES, data, {
      spaces: 2
    });
  }

  initializeBackupsList() {
    return this.updateRegisteredBackups([]);
  }

  /**
   * scan for backups in a chosen folder
   * @param {*} folderPath the path of the folder to scan for backups
   * @returns array of valid backups if exist in the chosen folder path
   */
  async checkForBackupsInFolder(folderPath) {
    const AdmZip = require("adm-zip");
    const path = require("path");
    const validBackups = [];
    const files = await fse.readdir(folderPath);

    for (let file of files) {
      if (!file.endsWith(".zip")) continue;

      const zipfilePath = path.join(folderPath, file);
      const zip = new AdmZip(zipfilePath);
      const zipEntries = zip.getEntries();

      let valid = false;

      zipEntries.forEach(function ({ entryName }) {
        if (
          (entryName == "ramot-group-db.sqlite" &&
            entryName == "config.json") ||
          entryName == "ramot-group-db.sqlite"
        ) {
          valid = true;
        }
      });

      if (valid) validBackups.push(file);
    }

    return validBackups;
  }

  async scanForBackupsAndRegister(path) {
    const SettingsLogic = require("./SettingsLogic");
    const RegisteredBackupsLogic = require("./RegisteredBackupsLogic");
    const settingsLogic = new SettingsLogic();
    const registeredBackupsLogic = new RegisteredBackupsLogic();

    const files = await this.checkForBackupsInFolder(path);

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

module.exports = RegisteredBackupsLogic;
