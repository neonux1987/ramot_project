const IOLogic = require("../logic/IOLogic");
const os = require('os');
const homedir = os.homedir();

const CONFIG_LOCATION = homedir + "/Dropbox/ndts/config/config.json";

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

}

module.exports = SettingsLogic;