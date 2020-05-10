const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "MonthlyStatsDao.js"

class MonthlyStatsDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  getMonthStatsTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_monthly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף סטטיסטיקה חודשית לבניין ${buildingName} לחודש ${date.month} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getAllMonthsStatsByQuarterTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingName}_monthly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף סטטיסטיקה לחודשים של רבעון ${date.quarter} לבניין ${buildingName} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateMonthStatsTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_monthly_stats`)
      .where({ year: date.year, month: date.monthHeb })
      .update(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בסטטיסטיקת חודש לבניין ${buildingName} לחודש ${date.month} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  insertMonthStats(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_monthly_stats").insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לסטטיסטיקת חודש לבניין ${buildingName} לחודש ${date.month} שנה ${date.year}`;
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
    return trx.batchInsert(`${buildingName}_monthly_stats`, rows, rows.length)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות לסטטיסטיקת חודש לבניין ${buildingName} לחודש ${date.month} שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }


}

module.exports = MonthlyStatsDao;