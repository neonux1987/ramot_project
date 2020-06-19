const YearlyStatsDao = require('../dao/YearlyStatsDao');

class YearlyStatsLogic {

  constructor() {
    this.yearlyStatsDao = new YearlyStatsDao();
  }

  getYearStatsByYearRange(buildingName, fromYear, toYear) {
    return this.yearlyStatsDao.getYearStatsByYearRange(buildingName, fromYear, toYear);
  }

  getYearStatsTrx(buildingName = String, date = Object, trx) {
    return this.yearlyStatsDao.getYearStatsTrx(buildingName, date, trx);
  }

  updateYearStatsTrx(buildingName = String, date = Object, budgetExpanse, trx) {
    return this.yearlyStatsDao.updateYearStatsTrx(buildingName, date, budgetExpanse, trx);
  }

  insertYearStatsTrx(buildingName, data, trx) {
    return this.yearlyStatsDao.insertYearStatsTrx(buildingName, data, trx);
  }

}

module.exports = YearlyStatsLogic;