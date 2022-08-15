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
      const lastUpdateDate = null;

      if (files.length > 0) {
        files.forEach((fileName, index) => {
          const dIndex = fileName.indexOf("D");
          const tIndex = fileName.indexOf("T");
          const dotIndex = fileName.indexOf(".");

          // current date
          let date = new Date();
          // convert date to local date he-il to
          // get the correct time
          const dateLocalString = date.toLocaleString();
          // set the curret time in the new date
          date = new Date(dateLocalString);
          date.se;
          // date
          const extractedDateString = fileName.slice(dIndex + 2, tIndex - 1);
          const dateArr = extractedDateString.split("-");
          date.setFullYear(Number.parseInt(dateArr[2]));
          date.setMonth(Number.parseInt(dateArr[0] - 1));
          date.setDate(Number.parseInt(dateArr[1]));

          // time
          const extractedTimeString = fileName.slice(tIndex + 2, dotIndex);
          const timeArr = extractedTimeString.split("-");
          date.setHours(Number.parseInt(timeArr[0]));
          date.setMinutes(Number.parseInt(timeArr[1]));
          date.setSeconds(Number.parseInt(timeArr[2]));

          const backupDetails = {
            backupDateTime: date.toISOString(),
            fileName: `${SystemPaths.info.db_file_name}-D-${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}-T-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.sqlite`
          };

          backups.push(backupDetails);
        });

        await this.updateRegisteredBackups(backups);

        // update settings in config file
        await settingsLogic.updateSpecificSetting(
          SettingsLogic.SETTINGS_NAMES.DB_BACKUP,
          {
            last_update: backups[0].backupDateTime,
            executed_backups: backups.length
          }
        );
      }
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
