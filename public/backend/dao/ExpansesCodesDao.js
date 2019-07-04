
class ExpansesCodesDao {

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * get all expanses codes
   */
  getExpansesCodes() {
    let data = this.connection.select().from("expanses_codes");
    return data.then((result) => {
      return result;
    }).catch((error) => {
      throw error;
    });
  }

  /**
   * update expanse code record
   * @param {*} data 
   */
  updateExpanseCode(data = { id: Number, summarized_section_id: Number, code: Number, codeName: String }) {
    return this.connection("expanses_codes")
      .where({ id: id })
      .update(expanseCode)
      .then((result) => result)
      .catch((error) => {
        throw new Error("קרתה תקלה בעידכון רשומת קוד של הנהלת חשבון.");
      });
  }

  /**
   * add new summarized section record
   * @param {*} record 
   */
  addExpanseCode(data = { summarized_section_id: Number, code: Number, codeName: String }) {
    return this.connection("expanses_codes").insert(data).catch((error) => {
      throw new Error("קרתה תקלה בהוספת קוד הנהלת חשבון חדש.");
    });;
  }

}

module.exports = ExpansesCodesDao;