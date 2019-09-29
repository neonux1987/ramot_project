const IOLogic = require("../logic/IOLogic");
const os = require('os');
const homedir = os.homedir();

const CONFIG_LOCATION = homedir + "/Dropbox/ndts/config/config.json";

class SettingsLogic {

  constructor() {
    this.iOLogic = new IOLogic();
  }

  async getSettings() {
    const settings = await this.iOLogic.readFile(CONFIG_LOCATION);
    console.log(JSON.parse(settings));
    return JSON.parse(settings);
  }

}

module.exports = SettingsLogic;