const GeneralSettingsDao = require('../dao/GeneralSettingsDao');

class GeneralSettingsLogic {

  constructor(connection) {
    this.gsd = new GeneralSettingsDao(connection);
  }

  getGeneralSettings() {
    return this.gsd.getGeneralSettings();
  }

  updateExpanseCode(params) {
    return this.gsd.updateGeneralSettings(params);
  }

}



module.exports = GeneralSettingsLogic;