class MonthTotalBudgetExpansesDao {

  constructor(connection) {
    this.connection = connection;
  }

  getMonthTotalTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_month_total`)
      .catch((error) => {
        throw error;
      });
  }

  getAllMonthsTotalByQuarterTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, quarter: date.quarter })
      .from(`${buildingName}_month_total`)
      .catch((error) => {
        throw error;
      });
  }

  updateMonthTotalTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_month_total`)
      .where({ year: date.year, month: date.month })
      .update(data)
      .catch((error) => {
        throw error;
      });
  }

  insertMonthtotal(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_month_total").insert(data)
      .catch((error) => {
        throw error;
      });
  }

  batchInsert(
    buildingName = String,
    rows,
    trx
  ) {
    return trx.batchInsert(`${buildingName}_month_total`, rows, rows.length)
      .catch((error) => {
        throw error;
      });
  }


}

module.exports = MonthTotalBudgetExpansesDao;