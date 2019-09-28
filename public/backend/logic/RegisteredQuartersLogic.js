const RegisteredQuartersDao = require('../dao/RegisteredQuartersDao');

class RegisteredQuartersLogic {

  constructor(connection) {
    this.connection = connection;
    this.registeredQuartersDao = new RegisteredQuartersDao(connection);
  }

  getAllRegisteredQuarters(buildingName) {
    return this.registeredQuartersDao.getAllRegisteredQuarters(buildingName);
  }

  registerNewQuarter(buildingName, data, trx) {
    return this.registeredQuartersDao.registerNewQuarter(buildingName, data, trx);
  }

}

module.exports = RegisteredQuartersLogic;