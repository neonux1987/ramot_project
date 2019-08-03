class GeneralSettingsDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get general settings
   */
  getGeneralSettings() {
    return this.connection.select("*")
      .from("general")
      .catch((error) => {
        throw error;
      });
  }

  /**
   * get general settings
   */
  getGeneralSettingsTrx(trx) {
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