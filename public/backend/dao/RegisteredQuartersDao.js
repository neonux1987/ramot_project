
class RegisteredQuartersDao {

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
   * add new quarter
   * @param {*} record 
   */
  addNewQuarter(
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