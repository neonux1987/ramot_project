const MonthlyStatsDao = require('../dao/MonthlyStatsDao');
const Helper = require('../../helpers/Helper');

class MonthlyStatsLogic {

  constructor(connection) {
    this.monthlyStatsDao = new MonthlyStatsDao(connection);
  }

  getMonthStatsTrx(buildingNameEng = String, date = Object, trx) {
    return this.monthlyStatsDao.getMonthStatsTrx(buildingNameEng, date, trx);
  }

  getAllMonthsStatsByQuarterTrx({ buildingName = String, date = Object, trx }) {
    return this.monthlyStatsDao.getAllMonthsStatsByQuarterTrx(buildingName, date, trx);
  }

  getAllMonthsStatsByYear(buildingNameEng, year, trx) {
    return this.monthlyStatsDao.getAllMonthsStatsByYear(buildingNameEng, year, trx);
  }

  updateMonthStatsTrx(buildingNameEng = String, date = Object, budgetExpanse = null, trx) {
    date.monthHeb = Helper.convertEngToHebMonth(date.month);
    date.monthNum = Helper.hebToMonthNum(date.monthHeb);

    return this.monthlyStatsDao.updateMonthStatsTrx(buildingNameEng, date, budgetExpanse, trx);
  }

  insertMonthStats(buildingNameEng, data, trx) {
    return this.monthlyStatsDao.insertMonthStats(buildingNameEng, data, trx);
  }

  batchInsert(buildingNameEng, rows, trx) {
    return this.monthlyStatsDao.batchInsert(buildingNameEng, rows, trx);
  }


}

module.exports = MonthlyStatsLogic;