
class ExpansesCodesDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get all expanses codes
   */
  getExpansesCodes() {
    return this.connection.select().from("expanses_codes")
      .orderBy(['code', { column: 'codeName', order: 'asc' }])
      .catch((error) => {
        throw error;
      });
  }

  /**
   * update expanse code record
   * @param {*} data 
   */
  updateExpanseCode({ id = Number, data = { summarized_section_id: Number, code: Number, codeName: String } }) {
    return this.connection("expanses_codes")
      .where({ id: id })
      .update(data)
      .then((result) => {
        if (result === 0) {
          throw new Error(`${id} לא קיימת רשומה עם מספר זיהוי`);
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * add new summarized section record
   * @param {*} record 
   */
  addExpanseCode(data = { summarized_section_id: Number, code: Number, codeName: String }) {
    return this.connection("expanses_codes")
      .insert(data)
      .catch((error) => {
        throw error;
      });
  }

  deleteExpanseCodeTrx(id = Number, trx) {
    return trx(expanses_codes)
      .where({ id: id })
      .del()
      .catch((error) => {
        throw error;
      });
  }

}

module.exports = ExpansesCodesDao;