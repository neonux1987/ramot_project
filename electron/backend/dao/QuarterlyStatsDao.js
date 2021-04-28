const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "QuarterlySatsDao.js"

class QuarterlyStatsDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  getQuarterStatsTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingName}_quarterly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה רבעונית לבניין ${buildingName} לפי רבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getAllQuartersStatsByYearTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingName}_quarterly_stats`)
      .orderBy('quarter', 'desc')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה רבעונית לבניין ${buildingName} לפי רבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateQuarterStatsTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_quarterly_stats`)
      .where({ year: date.year, quarter: date.quarter })
      .update(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בסטטיסטיקה רבעונית לבניין ${buildingName} לפי רבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  insertQuarterStats(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_quarterly_stats").insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לסטטיסטיקה רבעונית לבניין ${buildingName} לפי רבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }
  batchInsert(
    buildingName = String,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_quarterly_stats`, rows, rows.length)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות לסטטיסטיקה רבעונית לבניין ${buildingName} לפי רבעון ${date.quarter} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = QuarterlyStatsDao;