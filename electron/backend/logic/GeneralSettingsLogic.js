const GeneralSettingsDao = require('../dao/GeneralSettingsDao');

class GeneralSettingsLogic {

  constructor(connection) {
    this.gsd = new GeneralSettingsDao(connection);
  }

  getGeneralSettingsTrx(trx) {
    return this.gsd.getGeneralSettingsTrx(trx);
  }

  updateGeneralSettings(params) {
    return this.gsd.updateGeneralSettings(params);
  }

}



module.exports = GeneralSettingsLogic;