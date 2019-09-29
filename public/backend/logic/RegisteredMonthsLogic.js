const RegisteredMonthsDao = require('../dao/RegisteredMonthsDao');

class RegisteredMonthsLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredMonthsDao = new RegisteredMonthsDao(connection);
  }

  getAllRegisteredMonths(buildingName) {
    return this.registeredMonthsDao.getAllRegisteredMonths(buildingName);
  }

  getRegisteredMonth(buildingName, month, year, trx) {
    return this.registeredMonthsDao.getRegisteredMonth(buildingName, month, year, trx);
  }

  registerNewMonth(buildingName, data, trx) {
    return this.registeredMonthsDao.registerNewMonth(buildingName, data, trx);
  }

}

module.exports = RegisteredMonthsLogic;