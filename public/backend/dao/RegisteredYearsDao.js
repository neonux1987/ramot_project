
class RegisteredYearsDao {

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
   * add new year
   * @param {*} record 
   */
  addNewYear(
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