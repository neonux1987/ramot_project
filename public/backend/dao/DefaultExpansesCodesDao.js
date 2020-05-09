const connectionPool = require('../connection/ConnectionPool');

class DefaultExpansesCodesDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  /**
  * get all month expanses records
  */
  getDefaultExpansesCodesTrx = (
    trx = this.connection
  ) => {
    return trx.select(
      "dec.expanses_code_id AS expanses_code_id",
      "dec.supplierName AS supplierName",
      "dec.notes AS notes",
    ).from("default_expanses_codes AS dec")
      .innerJoin("expanses_codes AS ec", "ec.id", "dec.expanses_code_id")
      .orderBy(['code', { column: 'codeName', order: 'asc' }])
      .catch((error) => {
        const newError = new DbError("המערכת לא הצליחה לשלוף את קודי הנהלת החשבונות הברירת מחדל", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = DefaultExpansesCodesDao;