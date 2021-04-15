const RegisteredMonthsDao = require('../dao/RegisteredMonthsDao');

class RegisteredMonthsLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredMonthsDao = new RegisteredMonthsDao(connection);
  }

  getAllRegisteredMonths({ buildingNameEng, date }) {
    return this.registeredMonthsDao.getAllRegisteredMonths(buildingNameEng, date.year);
  }

  getRegisteredMonthTrx(buildingName, month, year, trx) {
    return this.registeredMonthsDao.getRegisteredMonthTrx(buildingName, month, year, trx);
  }

  getAllByQuarter(buildingName, date, trx) {
    return this.registeredMonthsDao.getAllByQuarter(buildingName, date, trx);
  }

  registerNewMonth(buildingName, data, trx) {
    return this.registeredMonthsDao.registerNewMonth(buildingName, data, trx);
  }

}

module.exports = RegisteredMonthsLogic;