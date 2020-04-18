
const connectionPool = require('../connection/ConnectionPool');

class BuildingsDao {

  getBuidlings(trx = connectionPool.getConnection()) {
    return trx.select("*").from('buildings')
      .catch((error) => {
        throw error;
      });

  }

}

module.exports = BuildingsDao;