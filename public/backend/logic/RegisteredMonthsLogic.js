const RegisteredMonthsDao = require('../dao/RegisteredMonthsDao');

class RegisteredMonthsLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredMonthsDao = new RegisteredMonthsDao(connection);
  }

  getAllRegisteredMonths(buildingName) {
    return this.registeredMonthsDao.getAllRegisteredMonths(buildingName);
  }

  getRegisteredMonthTrx(buildingName, month, year, trx) {
    return this.registeredMonthsDao.getRegisteredMonthTrx(buildingName, month, year, trx);
  }

  registerNewMonth(buildingName, data, trx) {
    return this.registeredMonthsDao.registerNewMonth(buildingName, data, trx);
  }

}

module.exports = RegisteredMonthsLogic;