const connectionPool = require('../connection/ConnectionPool');

class QuarterlyStatsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getQuarterStatsTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingName}_quarterly_stats`)
      .catch((error) => {
        throw error;
      });
  }

  getAllQuartersStatsByYearTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingName}_quarterly_stats`)
      .catch((error) => {
        throw error;
      });
  }

  updateQuarterStatsTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_quarterly_stats`)
      .where({ year: date.year, quarter: date.quarter })
      .update(data)
      .catch((error) => {
        throw error;
      });
  }

  insertQuarterStats(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_quarterly_stats").insert(data)
      .catch((error) => {
        throw error;
      });
  }
  batchInsert(
    buildingName = String,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_quarterly_stats`, rows, rows.length)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = QuarterlyStatsDao;