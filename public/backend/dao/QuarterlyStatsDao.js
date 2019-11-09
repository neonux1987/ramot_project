class QuarterlyStatsDao {

  constructor(connection) {
    this.connection = connection;
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

}

module.exports = QuarterlyStatsDao;