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
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingName}_yearly_stats`)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סטטיסטיקה שנתית לבניין ${buildingName} לפי שנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateYearStatsTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_yearly_stats`)
      .where({ year: date.year })
      .update(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן רשומה בנתוני סטטיסטיקה שנתית לבניין ${buildingName} לשנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  insertYearStatsTrx(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_yearly_stats").insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסי רשומה לנתוני סטטיסטיקה שנתית לבניין ${buildingName} לשנה ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = YearlyStatsDao;