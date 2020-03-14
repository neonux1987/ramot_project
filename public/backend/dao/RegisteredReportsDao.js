const connectionPool = require('../connection/ConnectionPool');

class RegisteredReportsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
   * get registered reports
   */
  getRegisteredReports() {
    return this.connection.select()
      .from("registered_reports")
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
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
    trx = this.connection
  ) {
    return trx("registered_reports")
      .insert(payload)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = RegisteredReportsDao;