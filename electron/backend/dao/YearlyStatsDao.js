const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "YearlyStatsDao.js";

class YearlyStatsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getYearStatsTrx(buildingId = String, date = Object, trx = this.connection) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingId}_yearly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה שנתית לבניין ${buildingId} לפי שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getYearStatsByYearRange(
    buildingId = String,
    fromYear,
    toYear,
    trx = this.connection
  ) {
    return trx("*")
      .whereBetween("year", [fromYear, toYear])
      .from(`${buildingId}_yearly_stats`)
      .orderBy("year", "desc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה שנתית לבניין ${buildingId} משנה ${fromYear} עד שנה ${toYear}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  updateYearStatsTrx(
    buildingId = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingId}_yearly_stats`)
      .where({ year: date.year })
      .update(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בנתוני סטטיסטיקה שנתית לבניין ${buildingId} לשנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  insertYearStatsTrx(
    buildingId = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingId + "_yearly_stats")
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסי רשומה לנתוני סטטיסטיקה שנתית לבניין ${buildingId} לשנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = YearlyStatsDao;
