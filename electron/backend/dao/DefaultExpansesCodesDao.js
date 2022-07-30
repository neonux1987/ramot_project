const DbError = require("../customErrors/DbError");
const logManager = require("../logger/LogManager");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "DefaultExpansesCodesDao.js";
const CHUNKSIZE = 100;

class DefaultExpansesCodesDao {
  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  getDefaultExpansesCodesTrx = (trx = this.connection) => {
    return trx
      .select(
        "dec.expanses_code_id AS expanses_code_id",
        "ec.codeName As codeName",
        "ec.code As code"
      )
      .from("default_expanses_codes AS dec")
      .innerJoin("expanses_codes AS ec", "ec.id", "dec.expanses_code_id")
      .orderBy(["codeName", { column: "codeName", order: "asc" }])
      .catch((error) => {
        const newError = new DbError(
          "המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות הברירת מחדל",
          FILENAME,
          error
        );
        this.logger.error(newError.toString());
        throw newError;
      });
  };

  batchInsertDefaultCodesTrx(payload, trx = this.connection) {
    return trx
      .batchInsert("default_expanses_codes", payload, CHUNKSIZE)
      .catch((error) => {
        const msg = "המערכת נכשלה בעדכון קודי ברירת מחדל";
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }

  batchDeleteDefaultCodesTrx(arrayOfIds, trx = this.connection) {
    return trx("default_expanses_codes")
      .whereIn("expanses_code_id", arrayOfIds)
      .del()
      .catch((error) => {
        const msg = "המערכת נכשלה בעדכון קודי ברירת מחדל";
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString());
        throw newError;
      });
  }
}

module.exports = DefaultExpansesCodesDao;
