const MonthTotalDao = require('../dao/MonthTotalDao');

class MonthTotalLogic {

  constructor(connection) {
    this.monthTotalDao = new MonthTotalDao(connection);
  }

  getMonthTotalTrx(buildingName = String, date = Object, trx) {
    return this.monthTotalDao.getMonthTotalTrx(buildingName, date, trx);
  }

  updateMonthTotalTrx(buildingName = String, date = Object, budgetExpanse = null, trx) {
    return this.monthTotalDao.updateMonthTotalTrx(buildingName, date, budgetExpanse, trx);
  }

}

module.exports = MonthTotalLogic;