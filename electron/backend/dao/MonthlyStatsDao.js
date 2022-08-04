const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "MonthlyStatsDao.js";

class MonthlyStatsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getMonthStatsTrx(buildingId = String, date = Object, trx = this.connection) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingId}_monthly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף סטטיסטיקה חודשית לבניין ${buildingId} לחודש ${date.month} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAllMonthsStatsByQuarterTrx(
    buildingId = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingId}_monthly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף סטטיסטיקה לחודשים של רבעון ${date.quarter} לבניין ${buildingId} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAllMonthsStatsByYear(
    buildingId = String,
    year = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year })
      .from(`${buildingId}_monthly_stats`)
      .orderBy([
        { column: "monthNum", order: "desc" },
        { column: "quarter", order: "desc" }
      ])
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף סטטיסטיקה לחודשים לבניין ${buildingId} של שנה ${year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAllBuildingStats(buildingId = String, trx = this.connection) {
    return trx("*")
      .from(`${buildingId}_monthly_stats`)
      .orderBy("year", "desc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את כל הסטטיסטיקה לבניין ${buildingId}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  updateMonthStatsTrx(
    buildingId = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingId}_monthly_stats`)
      .where({ year: date.year, month: date.monthHeb })
      .update(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בסטטיסטיקת חודש לבניין ${buildingId} לחודש ${date.month} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  insertMonthStats(buildingId = String, data = Object, trx = this.connection) {
    return trx(buildingId + "_monthly_stats")
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לסטטיסטיקת חודש לבניין ${buildingId} לחודש ${date.month} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  batchInsert(buildingId = String, rows, trx) {
    return trx
      .batchInsert(`${buildingId}_monthly_stats`, rows, rows.length)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומות לסטטיסטיקת חודש לבניין ${buildingId}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = MonthlyStatsDao;
