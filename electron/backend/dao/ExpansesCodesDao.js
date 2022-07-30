const DbError = require("../customErrors/DbError");
const logManager = require("../logger/LogManager");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "ExpansesCodesDao.js";

class ExpansesCodesDao {
  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  /**
   * get all expanses codes
   */
  getExpansesCodes() {
    return this.connection
      .select()
      .from("expanses_codes")
      .orderBy(["code", { column: "codeName", order: "asc" }])
      .catch((error) => {
        const newError = new DbError(
          "המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות",
          FILENAME,
          error
        );
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  getExpansesCodesReduced() {
    return this.connection
      .select(
        "ec.id AS expanses_code_id",
        "ec.codeName As codeName",
        "ec.code As code"
      )
      .from("expanses_codes AS ec")
      .orderBy(["code", { column: "codeName", order: "asc" }])
      .catch((error) => {
        const newError = new DbError(
          "המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות",
          FILENAME,
          error
        );
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  getExpansesCodesByStatus(status) {
    return this.connection
      .select()
      .from("expanses_codes")
      .orderBy(["code", { column: "codeName", order: "asc" }])
      .where({ status: status })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות לפי סטטוס ${status}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  getExpanseCodeByCode(code) {
    return this.connection
      .select()
      .from("expanses_codes")
      .where({ code })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את קוד הנהלת החשבונות לפי קוד ${code}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  /**
   * update expanse code record
   * @param {*} data
   */
  updateExpanseCode(id, data) {
    return this.connection("expanses_codes")
      .where({ id: id })
      .update(data)
      .then((result) => {
        if (result === 0) {
          const msg = `${id} לא קיימת רשומה עם מספר זיהוי`;
          const newError = new DbError(msg, FILENAME, error);
          this.logger.error(newError.toString());
          throw newError;
        }
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן את קוד הנהלת החשבונות לפי המזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  /**
   * add new summarized section record
   * @param {*} record
   */
  addExpanseCode(data) {
    return this.connection("expanses_codes")
      .insert(data)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף את קוד הנהלת החשבונות`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  deleteExpanseCodeTrx(id = Number, trx = this.connection) {
    return trx(expanses_codes)
      .where({ id: id })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק את קוד הנהלת החשבונות לפי המזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }
}

module.exports = ExpansesCodesDao;
