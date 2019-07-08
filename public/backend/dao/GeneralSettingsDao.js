class GeneralSettingsDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get general settings
   */
  getGeneralSettings() {
    return this.connection.select(
      "*"
    )
      .from("general")
      .catch((error) => {
        throw new Error("קרתה תקלה בשליפת הגדרות.");
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
        throw new Error("קרתה תקלה בעידכון הגדרות.");
      });
  }


}

module.exports = GeneralSettingsDao;