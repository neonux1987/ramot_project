const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "RegisteredMonthsDao.js";

class RegisteredMonthsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
   * get all the months
   * @param {*} buildingName
   */
  getAllRegisteredMonths(buildingName, year) {
    return this.connection
      .select()
      .from(`${buildingName}_registered_months`)
      .where({ year })
      .orderBy("monthNum", "asc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני החודשים הרשומים לבניין ${buildingName} לפי ${year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAllByQuarter(buildingName, date, trx = this.connection) {
    const { year, quarter } = date;
    return trx
      .select()
      .from(`${buildingName}_registered_months`)
      .where({ year, quarter })
      .orderBy("monthNum", "asc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני החודשים הרשומים לבניין ${buildingName} לפי ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * get all the months
   * @param {*} buildingName
   */
  getRegisteredMonthTrx(buildingName, month, year, trx = this.connection) {
    return trx
      .select()
      .from(`${buildingName}_registered_months`)
      .where({ month: month, year: year })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מהחודשים הרשומים לבניין ${buildingName} לפי חודש ${month} שנה ${year}`;
        throw new DbError(msg, FILENAME, error);
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
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = RegisteredMonthsDao;
