const QuarterTotalDao = require('../dao/QuarterTotalDao');

class QuarterTotalLogic {

  constructor(connection) {
    this.quarterTotalDao = new QuarterTotalDao(connection);
  }

  getQuarterTotalTrx({ buildingName = String, date = Object }, trx) {
    return this.quarterTotalDao.getQuarterTotalTrx(buildingName, date, trx);
  }

  updateQuarterTotalTrx(buildingName = String, date = Object, budgetExpanse = null, trx) {
    return this.quarterTotalDao.updateQuarterTotalTrx(buildingName, date, budgetExpanse, trx);
  }

  insertQuartertotal(buildingName, data, trx) {
    return this.quarterTotalDao.insertQuartertotal(buildingName, data, trx);
  }

}

module.exports = QuarterTotalLogic;