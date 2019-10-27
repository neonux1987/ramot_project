const YearTotalDao = require('../dao/YearTotalDao');

class YearTotalLogic {

  constructor(connection) {
    this.yearTotalDao = new YearTotalDao(connection);
  }

  getYearTotalBudgetExpansesTrx(buildingName = String, date = Object, trx) {
    return this.yearTotalDao.getYearTotalTrx(buildingName, date, trx);
  }

  updateYearTotalTrx(buildingName = String, date = Object, budgetExpanse, trx) {
    return this.yearTotalDao.updateYearTotalTrx(buildingName, date, budgetExpanse, trx);
  }

  insertYeartotal(buildingName, data, trx) {
    return this.yearTotalDao.insertYeartotal(buildingName, data, trx);
  }

}

module.exports = YearTotalLogic;