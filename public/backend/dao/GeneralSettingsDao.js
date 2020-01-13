const connectionPool = require('../connection/ConnectionPool');

class GeneralSettingsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
   * get general settings
   */
  getGeneralSettingsTrx(trx = this.connection) {
    return trx.select("*")
      .from("general")
      .catch((error) => {
        throw error;
      });
  }

  /**
   * update settings
   * @param {*} params
   */
  updateGeneralSettings({ id = Number, settings = Object }) {
    return this.connection("general")
      .where({ id: id })
      .update(settings)
      .catch((error) => {
        throw error;
      });
  }


}

module.exports = GeneralSettingsDao;