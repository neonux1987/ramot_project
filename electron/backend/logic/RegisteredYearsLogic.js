const RegisteredYearsDao = require('../dao/RegisteredYearsDao');

class RegisteredYearsLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredYearsDao = new RegisteredYearsDao(connection);
  }

  getAllRegisteredYears(buildingName) {
    return this.registeredYearsDao.getAllRegisteredYears(buildingName);
  }

  getRegisteredYearTrx(buildingName, year, trx) {
    return this.registeredYearsDao.getRegisteredYearTrx(buildingName, year, trx);
  }

  registerNewYear(buildingName, data, trx) {
    return this.registeredYearsDao.registerNewYear(buildingName, data, trx);
  }

}

module.exports = RegisteredYearsLogic;