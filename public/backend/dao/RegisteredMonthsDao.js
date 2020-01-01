
class RegisteredMonthsDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get all the months
   * @param {*} buildingName 
   */
  getAllRegisteredMonths(buildingName, year) {
    return this.connection.select()
      .from(`${buildingName}_registered_months`)
      .where({ year })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * get all the months
   * @param {*} buildingName 
   */
  getRegisteredMonthTrx(buildingName, month, year, trx = this.connection) {
    return trx.select().from(`${buildingName}_registered_months`).where({ month: month, year: year })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * add new month
   * @param {*} record 
   */
  registerNewMonth(
    buildingName,
    data = {
      year: Number,
      month: String
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_registered_months`)
      .insert(data)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = RegisteredMonthsDao;