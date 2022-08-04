const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "RegisteredReportsDao.js";

class RegisteredReportsDao {
  /**
   * get registered reports
   */
  getRegisteredReports(trx = connectionPool.getConnection()) {
    return trx
      .select()
      .from("registered_reports")
      .orderBy("year", "desc")
      .orderBy("month", "desc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getRegisteredReportsByYearAndQuarter(
    buildingId,
    year,
    quarter,
    trx = connectionPool.getConnection()
  ) {
    return trx
      .select("*")
      .from("registered_reports")
      .where({ year, quarter, buildingId })
      .groupBy("quarter")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים לפי רבעון ${quarter} שנה ${year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getRegisteredReportsByYear(year, trx = connectionPool.getConnection()) {
    return trx
      .select()
      .from("registered_reports")
      .where({ year })
      .groupBy("quarter")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים לפי שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getRegisteredReportsByBuildingId(
    buildingId,
    trx = connectionPool.getConnection()
  ) {
    return trx
      .select()
      .from("registered_reports")
      .where({ buildingId })
      .groupBy("quarter")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים לבניין ${buildingId}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getRegisteredReportsGroupedByYear(trx = connectionPool.getConnection()) {
    return trx
      .select()
      .from("registered_reports")
      .orderBy("year", "desc")
      .groupBy("year")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הדוחות הרשומים ממויינים לפי השנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * add new registered report
   * @param {*} payload
   * @param {*} trx
   */
  addNewReport(payload = Object, trx = connectionPool.getConnection()) {
    return trx("registered_reports")
      .insert(payload)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לדוחות הרשומים`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  removeReports(buildingId, trx = connectionPool.getConnection()) {
    return trx("registered_reports")
      .where({ buildingId })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק רשומות לקוד מזהה ${buildingId}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = RegisteredReportsDao;
