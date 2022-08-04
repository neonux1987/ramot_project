const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "RegisteredYearsDao.js";

class RegisteredYearsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
   * get all the years
   * @param {*} buildingName
   */
  getAllRegisteredYears(buildingName) {
    return this.connection
      .select()
      .from(`${buildingName}_registered_years`)
      .orderBy("year", "asc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני השנים הרשומות לבניין ${buildingName}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * get registered year
   * @param {*} buildingName
   */
  getRegisteredYearTrx(buildingName, year, trx = this.connection) {
    return trx
      .select()
      .from(`${buildingName}_registered_years`)
      .where({ year: year })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מהשנים הרשומות לבניין ${buildingName} לפי שנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  /**
   * add new year
   * @param {*} record
   */
  registerNewYear(
    buildingName,
    data = {
      year: Number
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_registered_years`)
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף רשומה לשנים הרשומות לבניין ${buildingName} לשנה ${date.year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = RegisteredYearsDao;
