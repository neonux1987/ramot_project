const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "RegisteredQuartersDao.js";

class RegisteredQuartersDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
   * get all the quarters
   * @param {*} buildingName
   */
  getAllRegisteredQuarters(buildingName, year) {
    return this.connection
      .select()
      .from(`${buildingName}_registered_quarters`)
      .where({ year })
      .orderBy("quarter", "asc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני הרבעונים הרשומים לבניין ${buildingName} לפי ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * get all the quarters
   * @param {*} buildingName
   */
  getRegisteredQuarterTrx(buildingName, quarter, year, trx = this.connection) {
    return trx
      .select()
      .from(`${buildingName}_registered_quarters`)
      .where({ quarter: quarter, year: year })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מהרבעונים הרשומים לבניין ${buildingName} לפי רבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * add new quarter
   * @param {*} record
   */
  registerNewQuarter(
    buildingName,
    data = {
      year: Number,
      quarter: Number,
      quarterHeb: String
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_registered_quarters`)
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא להוסיף רשומה לרבעונים הרשומים לבניין ${buildingName} לרבעון ${date.quarter} שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = RegisteredQuartersDao;
