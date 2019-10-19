class MonthTotalBudgetDao {

  constructor(connection) {
    this.connection = connection;
  }

  getMonthTotalBudgetTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year, month: date.month })
      .from(`${buildingName}_month_total_budget`)
      .catch((error) => {
        throw error;
      });
  }

  updateMonthTotalBudgetTrx(
    buildingName = String,
    date = Object,
    totalBudget = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_month_total_budget`)
      .where({ year: date.year, quarter: date.quarter, month: date.month })
      .update(totalBudget)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = MonthTotalBudgetDao;