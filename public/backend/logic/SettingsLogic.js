const fse = require('fs-extra');
const SystemPaths = require('../system/SystemPaths');

const CONFIG_LOCATION = SystemPaths.paths.config_file_path;

class SettingsLogic {

  getSettings() {
    return fse.readJson(CONFIG_LOCATION);
  }

  getSpecificSetting(settingName) {
    return this.getSettings().then((settings) => {
      return settings[settingName];
    });
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
    settings[name] = { ...payload };

    return this.updateSettings(settings);
  }

  updateSettings(data) {
    return fse.writeJSON(CONFIG_LOCATION, data, {
      spaces: 2
    });
  }

  static SETTINGS_NAMES = {
    LOCATIONS: "locations",
    DB_BACKUP: "db_backup",
    DB_RESTORE: "db_restore"
  }

}

module.exports = SettingsLogic;