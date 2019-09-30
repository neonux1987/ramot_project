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

  async updateSettings(key, data) {

    const settings = await this.getSettings();
    console.log(data);
    settings[key] = data;

    return this.iOLogic.writeFile(CONFIG_LOCATION, JSON.stringify(settings, null, 2));

  }

}

module.exports = SettingsLogic;