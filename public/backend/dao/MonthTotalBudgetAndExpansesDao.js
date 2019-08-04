class MonthTotalBudgetAndExpansesDao {

  constructor(connection) {
    this.connection = connection;
  }

  getMonthTotalBudgetAndExpanses(
    buildingName = String,
    date = Object
  ) {
    return this.connection.select("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_month_total_budget_and_expanses`)
      .catch((error) => {
        throw error;
      });
  }

  getMonthTotalBudgetAndExpansesTrx(
    buildingName = String,
    date = Object,
    trx
  ) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_month_total_budget_and_expanses`)
      .catch((error) => {
        throw error;
      });
  }

  updateMonthTotalBudgetAndExpansesTrx(
    buildingName = String,
    date = Object,
    totalMonthExpanses = Object,
    trx
  ) {
    return trx(`${buildingName}_month_total_budget_and_expanses`)
      .where({ year: date.year, month: date.month })
      .update(totalMonthExpanses)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = MonthTotalBudgetAndExpansesDao;