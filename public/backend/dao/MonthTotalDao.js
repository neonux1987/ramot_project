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

}

module.exports = MonthTotalBudgetExpansesDao;