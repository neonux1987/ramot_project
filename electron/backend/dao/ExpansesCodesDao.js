const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "ExpansesCodesDao.js";

class ExpansesCodesDao {
  constructor() {
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
        throw new DbError(
          "המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות",
          FILENAME,
          error
        );
      });
  }

  getExpansesCodesReducedByStatus(status = "active") {
    return this.connection
      .select(
        "ec.id AS expanses_code_id",
        "ec.codeName As codeName",
        "ec.code As code"
      )
      .from("expanses_codes AS ec")
      .orderBy(["code", { column: "codeName", order: "asc" }])
      .where({ status })
      .catch((error) => {
        throw new DbError(
          "המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות",
          FILENAME,
          error
        );
      });
  }

  getExpansesCodesByStatus(status) {
    return this.connection
      .select()
      .from("expanses_codes")
      .orderBy(["code", { column: "codeName", order: "asc" }])
      .where({ status })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות לפי סטטוס ${status}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getExpanseCodeByCode(code) {
    return this.connection
      .select()
      .from("expanses_codes")
      .where({ code })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את קוד הנהלת החשבונות לפי קוד ${code}`;
        throw new DbError(msg, FILENAME, error);
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
          throw new DbError(msg, FILENAME, error);
        }
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן את קוד הנהלת החשבונות לפי המזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
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
        throw new DbError(msg, FILENAME, error);
      });
  }

  deleteExpanseCodeTrx(id = Number, trx = this.connection) {
    return trx(expanses_codes)
      .where({ id: id })
      .del()
      .catch((error) => {
        const msg = `המערכת לא הצליחה למחוק את קוד הנהלת החשבונות לפי המזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = ExpansesCodesDao;
