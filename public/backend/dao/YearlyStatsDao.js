const connectionPool = require('../connection/ConnectionPool');

class YearlyStatsDao {

  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getYearStatsTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingName}_yearly_stats`)
      .catch((error) => {
        throw error;
      });
  }

  updateYearStatsTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_yearly_stats`)
      .where({ year: date.year })
      .update(data)
      .catch((error) => {
        throw error;
      });
  }

  insertYearStatsTrx(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_yearly_stats").insert(data)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = YearlyStatsDao;