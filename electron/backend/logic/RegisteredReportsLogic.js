const RegisteredReportsDao = require('../dao/RegisteredReportsDao');

class RegisteredReportsLogic {

  constructor() {
    this.registeredReportsDao = new RegisteredReportsDao();
  }

  getRegisteredReports(trx) {
    return this.registeredReportsDao.getRegisteredReports(trx);
  }

  getRegisteredReportsByYearAndQuarter(buildingId, year, quarter, trx) {
    return this.registeredReportsDao.getRegisteredReportsByYearAndQuarter(buildingId, year, quarter, trx);
  }

  getRegisteredReportsByYear(year, trx) {
    return this.registeredReportsDao.getRegisteredReportsByYear(year, trx);
  }

  getRegisteredReportsGroupedByYear(trx) {
    return this.registeredReportsDao.getRegisteredReportsGroupedByYear(trx);
  }

  addNewReport(payload, trx) {
    return this.registeredReportsDao.addNewReport(payload, trx);
  }

}

module.exports = RegisteredReportsLogic;