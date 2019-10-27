class YearTotalBudgetExpansesDao {

  constructor(connection) {
    this.connection = connection;
  }

  getYearTotalTrx(
    buildingName = String,
    date = Object,
    trx = this.connection
  ) {
    return trx("*")
      .where({ year: date.year })
      .from(`${buildingName}_year_total`)
      .catch((error) => {
        throw error;
      });
  }

  updateYearTotalTrx(
    buildingName = String,
    date = Object,
    data = Object,
    trx = this.connection
  ) {
    return trx(`${buildingName}_year_total`)
      .where({ year: date.year })
      .update(data)
      .catch((error) => {
        throw error;
      });
  }

  insertYeartotal(
    buildingName = String,
    data = Object,
    trx = this.connection
  ) {
    return trx(buildingName + "_quarter_total").insert(data)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = YearTotalBudgetExpansesDao;