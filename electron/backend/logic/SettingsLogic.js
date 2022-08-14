const fse = require("fs-extra");
const LogicError = require("../customErrors/LogicError");
const SystemPaths = require("../system/SystemPaths");

const CONFIG_LOCATION = SystemPaths.paths.config_file_path;

class SettingsLogic {
  getSettings() {
    return fse.readJson(CONFIG_LOCATION);
  }

  async ensureConfigFileExistAndCreate() {
    try {
      // will throw and error if settings file do not exist
      await this.getSettings();
    } catch (error) {
      if (error.message.includes("ENOENT") === false)
        throw new LogicError(
          "קיימת בעיה בקריאה של קובץ הגדרות",
          "SettingsLogic.js",
          error
        );

      const SetupLogic = require("./SetupLogic");
      const setupLogic = new SetupLogic();

      await setupLogic.createCleanSettingsFile();
      await setupLogic.setLocations();
    }
  }

  getSpecificSetting(settingName) {
    return this.getSettings().then((settings) => {
      return settings[settingName];
    });
  }

  getUserSettings() {
    return this.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.USER);
  }

  getSystemSettings() {
    return this.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.SYSTEM);
  }

  getThemeSettings() {
    return this.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.THEME);
  }

  getLocationsSettings() {
    return this.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.LOCATIONS);
  }

  getDbBackupSettings() {
    return this.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.DB_BACKUP);
  }

  getDbRestoreSettings() {
    return this.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.DB_RESTORE);
  }

  async updateSpecificSetting(name, payload) {
    const settings = await this.getSettings(name);
    settings[name] = {
      ...settings[name],
      ...payload
    };

    return this.updateSettings(settings);
  }

  updateSettings(data) {
    return fse.writeJSON(CONFIG_LOCATION, data, {
      spaces: 2
    });
  }

  static SETTINGS_NAMES = {
    USER: "user",
    SYSTEM: "system",
    THEME: "theme",
    LOCATIONS: "locations",
    DB_BACKUP: "db_backup",
    DB_RESTORE: "db_restore"
  };
}

module.exports = SettingsLogic;
