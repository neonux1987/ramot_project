const RegisteredQuartersDao = require('../dao/RegisteredQuartersDao');

class RegisteredQuartersLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredQuartersDao = new RegisteredQuartersDao(connection);
  }

  getAllRegisteredQuarters({ buildingName, date }) {
    return this.registeredQuartersDao.getAllRegisteredQuarters(buildingName, date.year);
  }

  getRegisteredQuarterTrx(buildingName, quarter, year, trx) {
    return this.registeredQuartersDao.getRegisteredQuarterTrx(buildingName, quarter, year, trx);
  }

  registerNewQuarter(buildingName, data, trx) {
    return this.registeredQuartersDao.registerNewQuarter(buildingName, data, trx);
  }

}

module.exports = RegisteredQuartersLogic;