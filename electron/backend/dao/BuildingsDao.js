const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "BuildingsDao.js"

class BuildingsDao {

  constructor() {
    this.logger = logManager.getLogger();
  }

  getBuidlings(trx = connectionPool.getConnection()) {
    return trx.select("*").from('buildings')
      .catch((error) => {
        const newError = new DbError("המערכת לא הצליחה לשלוף את הנתונים של הבניינים", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = BuildingsDao;