const MonthlyStatsDao = require('../dao/MonthlyStatsDao');
const Helper = require('../../helpers/Helper');

class MonthlyStatsLogic {

  constructor(connection) {
    this.monthlyStatsDao = new MonthlyStatsDao(connection);
  }

  getMonthStatsTrx(buildingId = String, date = Object, trx) {
    return this.monthlyStatsDao.getMonthStatsTrx(buildingId, date, trx);
  }

  getAllMonthsStatsByQuarterTrx({ buildingName = String, date = Object, trx }) {
    return this.monthlyStatsDao.getAllMonthsStatsByQuarterTrx(buildingName, date, trx);
  }

  getAllMonthsStatsByYear(buildingId, year, trx) {
    return this.monthlyStatsDao.getAllMonthsStatsByYear(buildingId, year, trx);
  }

  updateMonthStatsTrx(buildingId = String, date = Object, budgetExpanse = null, trx) {
    date.monthHeb = Helper.convertEngToHebMonth(date.month);
    date.monthNum = Helper.hebToMonthNum(date.monthHeb);

    return this.monthlyStatsDao.updateMonthStatsTrx(buildingId, date, budgetExpanse, trx);
  }

  insertMonthStats(buildingId, data, trx) {
    return this.monthlyStatsDao.insertMonthStats(buildingId, data, trx);
  }

  batchInsert(buildingId, rows, trx) {
    return this.monthlyStatsDao.batchInsert(buildingId, rows, trx);
  }


}

module.exports = MonthlyStatsLogic;