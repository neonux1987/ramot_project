const QuarterlyStatsDao = require('../dao/QuarterlyStatsDao');

class QuarterlyStatsLogic {

  constructor(connection) {
    this.quarterlyStatsDao = new QuarterlyStatsDao(connection);
  }

  getQuarterStatsTrx({ buildingName = String, date = Object }, trx) {
    return this.quarterlyStatsDao.getQuarterStatsTrx(buildingName, date, trx);
  }

  getAllQuartersStatsByYearTrx({ buildingName = String, date = Object }, trx) {
    return this.quarterlyStatsDao.getAllQuartersStatsByYearTrx(buildingName, date, trx);
  }

  updateQuarterStatsTrx(buildingName = String, date = Object, budgetExpanse = null, trx) {
    return this.quarterlyStatsDao.updateQuarterStatsTrx(buildingName, date, budgetExpanse, trx);
  }

  insertQuarterStats(buildingName, data, trx) {
    return this.quarterlyStatsDao.insertQuarterStats(buildingName, data, trx);
  }

}

module.exports = QuarterlyStatsLogic;