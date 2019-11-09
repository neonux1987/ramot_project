const MonthlyStatsDao = require('../dao/MonthlyStatsDao');

class MonthlyStatsLogic {

  constructor(connection) {
    this.monthlyStatsDao = new MonthlyStatsDao(connection);
  }

  getMonthStatsTrx(buildingName = String, date = Object, trx) {
    return this.monthlyStatsDao.getMonthStatsTrx(buildingName, date, trx);
  }

  getAllMonthsStatsByQuarterTrx({ buildingName = String, date = Object, trx }) {
    return this.monthlyStatsDao.getAllMonthsStatsByQuarterTrx(buildingName, date, trx);
  }

  updateMonthStatsTrx(buildingName = String, date = Object, budgetExpanse = null, trx) {
    return this.monthlyStatsDao.updateMonthStatsTrx(buildingName, date, budgetExpanse, trx);
  }

  insertMonthStats(buildingName, data, trx) {
    return this.monthlyStatsDao.insertMonthStats(buildingName, data, trx);
  }

  batchInsert(buildingName, rows, trx) {
    return this.monthlyStatsDao.batchInsert(buildingName, rows, trx);
  }


}

module.exports = MonthlyStatsLogic;