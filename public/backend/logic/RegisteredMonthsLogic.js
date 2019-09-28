const RegisteredMonthsDao = require('../dao/RegisteredMonthsDao');

class RegisteredMonthsLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredMonthsDao = new RegisteredMonthsDao(connection);
  }

  getAllRegisteredMonths(buildingName) {
    return this.registeredMonthsDao.getAllRegisteredMonths(buildingName);
  }

  getAllRegisteredMonthsByMonth(buildingName) {
    return this.registeredMonthsDao.getAllRegisteredMonthsByMonth(buildingName, month);
  }

  registerNewMonth(buildingName, data, trx) {
    return this.registeredMonthsDao.registerNewMonth(buildingName, data, trx);
  }

}

module.exports = RegisteredMonthsLogic;