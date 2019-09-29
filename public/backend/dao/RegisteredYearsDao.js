
class RegisteredYearsDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get all the years
   * @param {*} buildingName 
   */
  getAllRegisteredYears(buildingName) {
    return this.connection.select().from(`${buildingName}_registered_years`)
      .catch((error) => {
        throw error;
      });
  }

  /**
 * get registered year
 * @param {*} buildingName 
 */
  getRegisteredYearTrx(buildingName, year, trx = this.connection) {
    return trx.select().from(`${buildingName}_registered_years`).where({ year: year })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * add new year
   * @param {*} record 
   */
  registerNewYear(
    buildingName,
    data = {
      year: Number
    },
    trx = this.connection
  ) {
    return trx(`${buildingName}_registered_years`)
      .insert(data)
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = RegisteredYearsDao;