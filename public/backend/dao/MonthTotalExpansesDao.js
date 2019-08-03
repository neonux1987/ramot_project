class MonthTotalExpansesDao {

  constructor(connection) {
    this.connection = connection;
  }

  getMonthTotalExpanses(
    buildingName = String,
    date = Object
  ) {
    return this.connection.select("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_total_month_expanses`)
      .catch((error) => {
        throw error;
      });
  }

  getMonthTotalExpansesTrx(
    buildingName = String,
    date = Object,
    trx
  ) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_total_month_expanses`)
      .catch((error) => {
        throw error;
      });
  }

  updateMonthTotalExpansesTrx(
    buildingName = String,
    date = Object,
    totalMonthExpanses = Object,
    trx
  ) {
    return trx(`${buildingName}_total_month_expanses`)
      .where({ year: date.year, month: date.month })
      .update(totalMonthExpanses)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = MonthTotalExpansesDao;