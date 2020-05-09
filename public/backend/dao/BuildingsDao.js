
const connectionPool = require('../connection/ConnectionPool');

class BuildingsDao {

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