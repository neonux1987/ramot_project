const RegisteredReportsDao = require('../dao/RegisteredReportsDao');

class RegisteredReportsLogic {

  constructor() {
    this.registeredReportsDao = new RegisteredReportsDao();
  }

  getRegisteredReports() {
    return this.registeredReportsDao.getRegisteredReports();
  }

  addNewReport(payload, trx) {
    return this.registeredReportsDao.addNewReport(payload, trx);
  }

}

module.exports = RegisteredReportsLogic;