const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "YearlyStatsDao.js"

class YearlyStatsDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  getYearStatsTrx(
    buildingId = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingId}_yearly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה שנתית לבניין ${buildingId} לפי שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getYearStatsByYearRange(
    buildingId = String,
    fromYear,
    toYear,
    trx = this.connection
  ) {
    return trx("*")
      .whereBetween('year', [fromYear, toYear])
      .from(`${buildingId}_yearly_stats`)
      .orderBy("year", "desc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה שנתית לבניין ${buildingId} משנה ${fromYear} עד שנה ${toYear}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
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
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  insertYearStatsTrx(
    buildingId = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingId + "_yearly_stats").insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסי רשומה לנתוני סטטיסטיקה שנתית לבניין ${buildingId} לשנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = YearlyStatsDao;