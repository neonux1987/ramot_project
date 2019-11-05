const MonthTotalDao = require('../dao/MonthTotalDao');

class MonthTotalLogic {

  constructor(connection) {
    this.monthTotalDao = new MonthTotalDao(connection);
  }

  getMonthTotalTrx(buildingName = String, date = Object, trx) {
    return this.monthTotalDao.getMonthTotalTrx(buildingName, date, trx);
  }

  getAllMonthsTotalByQuarterTrx({ buildingName = String, date = Object, trx }) {
    return this.monthTotalDao.getAllMonthsTotalByQuarterTrx(buildingName, date, trx);
  }

  updateMonthTotalTrx(buildingName = String, date = Object, budgetExpanse = null, trx) {
    return this.monthTotalDao.updateMonthTotalTrx(buildingName, date, budgetExpanse, trx);
  }

  insertMonthtotal(buildingName, data, trx) {
    return this.monthTotalDao.insertMonthtotal(buildingName, data, trx);
  }

  batchInsert(buildingName, rows, trx) {
    return this.monthTotalDao.batchInsert(buildingName, rows, trx);
  }


}

module.exports = MonthTotalLogic;