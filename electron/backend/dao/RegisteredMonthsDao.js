
const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "RegisteredMonthsDao.js"

class RegisteredMonthsDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  /**
   * get all the months
   * @param {*} buildingName 
   */
  getAllRegisteredMonths(buildingName, year) {
    return this.connection.select()
      .from(`${buildingName}_registered_months`)
      .where({ year })
      .orderBy('monthNum', 'asc')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני החודשים הרשומים לבניין ${buildingName} לפי ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getAllByQuarter(buildingName, date, trx = this.connection) {
    const { year, quarter } = date;
    return trx.select()
      .from(`${buildingName}_registered_months`)
      .where({ year, quarter })
      .orderBy('monthNum', 'asc')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני החודשים הרשומים לבניין ${buildingName} לפי ${date.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  /**
   * get all the months
   * @param {*} buildingName 
   */
  getRegisteredMonthTrx(buildingName, month, year, trx = this.connection) {
    return trx.select().from(`${buildingName}_registered_months`).where({ month: month, year: year })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מהחודשים הרשומים לבניין ${buildingName} לפי חודש ${month} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  /**
   * add new month
   * @param {*} record 
   */
  registerNewMonth(
    buildingName,
    data = {
      year: Number,
      month: String
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_registered_months`)
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא להוסיף רשומה לחודשים הרשומים לבניין ${buildingName} לחודש ${data.month} שנה ${data.year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = RegisteredMonthsDao;