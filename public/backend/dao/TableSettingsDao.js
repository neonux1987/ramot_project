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
        throw error;
      });
  }

  updateTableSettings(pageName, settings) {
    return this.connection("month_expanses_table_settings")
      .where({ pageName: pageName })
      .update(settings)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = TableSettingsDao;