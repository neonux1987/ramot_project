const connectionPool = require('../connection/ConnectionPool');

class TableSettingsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getTableSettings(pageName) {
    return this.connection("*")
      .from("table_settings")
      .where({ pageName: pageName })
      .then((result) => result[0])
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני טבלה לפי שם עמוד ${pageName}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateTableSettings(pageName, settings) {
    return this.connection("month_expanses_table_settings")
      .where({ pageName: pageName })
      .update(settings)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן את נתוני הטבלה לפי שם עמוד ${pageName}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = TableSettingsDao;