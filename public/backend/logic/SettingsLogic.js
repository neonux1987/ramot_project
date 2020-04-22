const IOLogic = require("../logic/IOLogic");
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();
const path = require('path');
const ConfigurationLogic = require('../logic/ConfigurationLogic');

const CONFIG_LOCATION = ConfigurationLogic.paths.config_path;
const CONFIG_BACKUPS_NAMES = ConfigurationLogic.paths.backups_names_path;

class SettingsLogic {

  constructor() {
    this.iOLogic = new IOLogic();
  }

  getSettings() {
    return this.iOLogic.readFile(CONFIG_LOCATION).then((settings) => {
      return JSON.parse(settings);
    });
  }

  getSpecificSetting(settingName) {
    return this.getSettings(settingName).then((settings) => {
      return settings[settingName];
    });
  }

  getLocationsSettings() {
    return this.getSpecificSetting(SETTINGS_NAMES.LOCATIONS);
  }

  getDbBackupSettings() {
    return this.getSpecificSetting(SETTINGS_NAMES.DB_BACKUP);
  }

  getDbRestoreSettings() {
    return this.getSpecificSetting(SETTINGS_NAMES.DB_RESTORE);
  }

  async updateSpecificSetting(name, payload) {
    const settings = await this.getSettings(name);
    settings[name] = payload;

    return this.updateSettings(settings);
  }

  updateSettings(data) {
    return this.iOLogic.writeFile(CONFIG_LOCATION, JSON.stringify(data, null, 2));
  }

  getBackupsNames() {
    return this.iOLogic.readFile(CONFIG_BACKUPS_NAMES).then((settings) => {
      return JSON.parse(settings);
    });
  }

  updateBackupsNames(data) {
    return this.iOLogic.writeFile(CONFIG_BACKUPS_NAMES, JSON.stringify(data, null, 2));
  }

  initializeBackupNames() {
    return this.updateBackupsNames([]);
  }

  static SETTINGS_NAMES = {
    LOCATIONS: "locations",
    DB_BACKUP: "db_backup",
    DB_RESTORE: "db_restore"
  }

}

module.exports = SettingsLogic;