const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "GeneralSettingsDao.js";

class GeneralSettingsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
   * get general settings
   */
  getGeneralSettingsTrx(trx = this.connection) {
    return trx
      .select("*")
      .from("general")
      .catch((error) => {
        throw new DbError(
          "המערכת לא הצליחה לשלוף נתונים לגבי הגדרות כלליות",
          FILENAME,
          error
        );
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
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = GeneralSettingsDao;
