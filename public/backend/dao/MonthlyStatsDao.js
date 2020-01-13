const connectionPool = require('../connection/ConnectionPool');

class MonthlyStatsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getMonthStatsTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_monthly_stats`)
      .catch((error) => {
        throw error;
      });
  }

  getAllMonthsStatsByQuarterTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingName}_monthly_stats`)
      .catch((error) => {
        throw error;
      });
  }

  updateMonthStatsTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_monthly_stats`)
      .where({ year: date.year, month: date.monthHeb })
      .update(data)
      .catch((error) => {
        throw error;
      });
  }

  insertMonthStats(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_monthly_stats").insert(data)
      .catch((error) => {
        throw error;
      });
  }

  batchInsert(
    buildingName = String,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_monthly_stats`, rows, rows.length)
      .catch((error) => {
        throw error;
      });
  }


}

module.exports = MonthlyStatsDao;