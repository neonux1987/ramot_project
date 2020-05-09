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
        const newError = new DbError("המערכת לא הצליחה לשלוף נתונים לגבי הגדרות כלליות", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
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
        const msg = `המערכת לא הצליחה לעדכן את ההגדרות הכלליות לפי המזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }


}

module.exports = GeneralSettingsDao;