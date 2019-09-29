
class RegisteredQuartersDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get all the quarters
   * @param {*} buildingName 
   */
  getAllRegisteredQuarters(buildingName) {
    return this.connection.select().from(`${buildingName}_registered_quarters`)
      .catch((error) => {
        throw error;
      });
  }

  /**
 * get all the quarters
 * @param {*} buildingName 
 */
  getRegisteredQuarterTrx(buildingName, quarter, year, trx = this.connection) {
    return trx.select().from(`${buildingName}_registered_quarters`).where({ quarter: quarter, year: year })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * add new quarter
   * @param {*} record 
   */
  registerNewQuarter(
    buildingName,
    data = {
      year: Number,
      quarter: Number
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_registered_quarters`)
      .insert(data)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = RegisteredQuartersDao;