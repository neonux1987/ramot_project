const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "QuarterlySatsDao.js";

class QuarterlyStatsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getQuarterStatsTrx(
    buildingId = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingId}_quarterly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה רבעונית לבניין ${buildingId} לפי רבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAllQuartersStatsByYearTrx(
    buildingId = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingId}_quarterly_stats`)
      .orderBy("quarter", "desc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה רבעונית לבניין ${buildingId} לפי רבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  updateQuarterStatsTrx(
    buildingId = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingId}_quarterly_stats`)
      .where({ year: date.year, quarter: date.quarter })
      .update(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בסטטיסטיקה רבעונית לבניין ${buildingId} לפי רבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  insertQuarterStats(
    buildingId = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingId + "_quarterly_stats")
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לסטטיסטיקה רבעונית לבניין ${buildingId} לפי רבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
  batchInsert(buildingId = String, rows, trx) {
    return trx
      .batchInsert(`${buildingId}_quarterly_stats`, rows, rows.length)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות לסטטיסטיקה רבעונית לבניין ${buildingId} לפי רבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = QuarterlyStatsDao;
