const IOLogic = require("../logic/IOLogic");
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();
const path = require('path');

const CONFIG_LOCATION = platform === "linux" ? homedir + "/Dropbox/ndts/config/config.json" : `${homedir}\\AppData\\Roaming\\ndts\\config\\config.json`;
const CONFIG_BACKUPS_NAMES = platform === "linux" ? homedir + "/Dropbox/ndts/config/backupsNames.json" : `${homedir}\\AppData\\Roaming\\ndts\\config\\backupsNames.json`;
const dbPath = platform === "linux" ? path.join(homedir, "Dropbox/ndts/db/mezach-db.sqlite") : `${homedir}\\AppData\\Roaming\\ndts\\db\\mezach-db.sqlite`;

class SettingsLogic {

  constructor() {
    this.iOLogic = new IOLogic();

    const settingsPromise = this.iOLogic.readFile(CONFIG_LOCATION);

    settingsPromise.then((settings) => {
      const parsedSettings = JSON.parse(settings);
      parsedSettings.locations.db_path = dbPath;
      this.iOLogic.writeFile(CONFIG_LOCATION, JSON.stringify(parsedSettings, null, 2));
    })

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