const RegisteredMonthsDao = require('../dao/RegisteredMonthsDao');

class RegisteredMonthsLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredMonthsDao = new RegisteredMonthsDao();
  }

  getAllRegisteredMonths(buildingName) {
    return this.registeredMonthsDao.getAllRegisteredMonths(buildingName);
  }

  registerNewMonth(buildingName, data) {
    return this.registeredMonthsDao.registerNewMonth(buildingName, data, trx);
  }

}

module.exports = RegisteredMonthsLogic;