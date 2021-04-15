const TableSettingsDao = require('../dao/TableSettingsDao');

class TableSettingsLogic {

  constructor(connection) {
    this.tableSettingsDao = new TableSettingsDao(connection);
  }

  getTableSettings(pageName) {
    return this.tableSettingsDao.getTableSettings(pageName);
  }

  updateTableSettings(pageName, settings) {
    return this.tableSettingsDao.updateTableSettings(pageName, settings);
  }

}

module.exports = TableSettingsLogic;