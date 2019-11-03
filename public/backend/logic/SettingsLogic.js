const IOLogic = require("../logic/IOLogic");
const os = require('os');
const platform = os.platform();
const homedir = os.homedir();

const CONFIG_LOCATION = platform==="linux" ? homedir + "/Dropbox/ndts/config/config.json": "C:/Users/ag1987/Dropbox/ndts/config/config.json";
const CONFIG_BACKUPS_NAMES = platform==="linux" ? homedir + "/Dropbox/ndts/config/backupsNames.json":"C:/Users/ag1987/Dropbox/ndts/config/backupsNames.json";

class SettingsLogic {

  constructor() {
    this.iOLogic = new IOLogic();
  }

  getSettings() {
    return this.iOLogic.readFile(CONFIG_LOCATION).then((settings) => {
      return JSON.parse(settings);
    });
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

}

module.exports = SettingsLogic;