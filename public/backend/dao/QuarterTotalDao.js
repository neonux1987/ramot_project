class QuarterTotalBudgetExpansesDao {

  constructor(connection) {
    this.connection = connection;
  }

  getQuarterTotalTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingName}_quarter_total`)
      .catch((error) => {
        throw error;
      });
  }

  updateQuarterTotalTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_quarter_total`)
      .where({ year: date.year, quarter: date.quarter })
      .update(data)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = QuarterTotalBudgetExpansesDao;