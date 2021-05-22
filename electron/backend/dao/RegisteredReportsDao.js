const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "RegisteredReportsDao.js"

class RegisteredReportsDao {

  constructor() {
    this.logger = logManager.getLogger();
  }

  /**
   * get registered reports
   */
  getRegisteredReports(trx = connectionPool.getConnection()) {
    return trx.select()
      .from("registered_reports")
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getRegisteredReportsByYearAndQuarter(
    buildingId,
    year,
    quarter,
    trx = connectionPool.getConnection()
  ) {
    return trx.select("*")
      .from("registered_reports")
      .where({ year, quarter, buildingId })
      .groupBy("quarter")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים לפי רבעון ${quarter} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getRegisteredReportsByYear(
    year,
    trx = connectionPool.getConnection()
  ) {
    return trx.select()
      .from("registered_reports")
      .where({ year })
      .groupBy("quarter")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים לפי שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getRegisteredReportsByBuildingId(
    buildingId,
    trx = connectionPool.getConnection()
  ) {
    return trx.select()
      .from("registered_reports")
      .where({ buildingId })
      .groupBy("quarter")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים לבניין ${buildingId}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getRegisteredReportsGroupedByYear(trx = connectionPool.getConnection()) {
    return trx.select()
      .from("registered_reports")
      .orderBy('year', 'desc')
      .groupBy('year')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים ממויינים לפי השנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
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
        const msg = `המערכת לא הצליחה להוסיף רשומה לדוחות הרשומים`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = RegisteredReportsDao;