const connectionPool = require('../connection/ConnectionPool');

class RegisteredReportsDao {

  /**
   * get registered reports
   */
  getRegisteredReports(trx = connectionPool.getConnection()) {
    return trx.select()
      .from("registered_reports")
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .catch((error) => {
        throw error;
      });
  }

  getRegisteredReportsGroupedByYear(trx = connectionPool.getConnection()) {
    return trx.select()
      .from("registered_reports")
      .orderBy('year', 'desc')
      .groupBy('year')
      .catch((error) => {
        throw error;
      });
  }

  /**
   * add new registered report
   * @param {*} payload 
   * @param {*} trx 
   */
  addNewReport(
    payload = Object,
    trx = connectionPool.getConnection()
  ) {
    return trx("registered_reports")
      .insert(payload)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = RegisteredReportsDao;