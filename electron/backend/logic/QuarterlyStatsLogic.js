const QuarterlyStatsDao = require('../dao/QuarterlyStatsDao');

class QuarterlyStatsLogic {

  constructor(connection) {
    this.quarterlyStatsDao = new QuarterlyStatsDao(connection);
  }

  getQuarterStatsTrx({ buildingId = String, date = Object }, trx) {
    return this.quarterlyStatsDao.getQuarterStatsTrx(buildingId, date, trx);
  }

  getAllQuartersStatsByYearTrx({ buildingId = String, date = Object }, trx) {
    return this.quarterlyStatsDao.getAllQuartersStatsByYearTrx(buildingId, date, trx);
  }

  updateQuarterStatsTrx(buildingId = String, date = Object, budgetExpanse = null, trx) {
    return this.quarterlyStatsDao.updateQuarterStatsTrx(buildingId, date, budgetExpanse, trx);
  }

  insertQuarterStats(buildingId, data, trx) {
    return this.quarterlyStatsDao.insertQuarterStats(buildingId, data, trx);
  }

  batchInsert(buildingId, rows, trx) {
    return this.quarterlyStatsDao.batchInsert(buildingId, rows, trx);
  }

}

module.exports = QuarterlyStatsLogic;