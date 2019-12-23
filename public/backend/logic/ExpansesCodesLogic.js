const ExpansesCodesDao = require('../dao/ExpansesCodesDao');

class ExpansesCodesLogic {

  constructor(connection) {
    this.expansesCodesDao = new ExpansesCodesDao(connection);
  }

  getExpansesCodes() {
    return this.expansesCodesDao.getExpansesCodes();
  }

  getExpansesCodesByStatus(status) {
    return this.expansesCodesDao.getExpansesCodesByStatus(status);
  }

  updateExpanseCode({ id = Number, data = { summarized_section_id: Number, code: Number, codeName: String } }) {
    return this.expansesCodesDao.updateExpanseCode(id, data);
  }

  addExpanseCode(data = { summarized_section_id: Number, code: Number, codeName: String }) {
    data.status = "active";
    return this.expansesCodesDao.addExpanseCode(data);
  }

  deleteExpanseCode(id) {
    const data = {
      status: "deleted"
    }
    return this.expansesCodesDao.updateExpanseCode(id, data);
  }

}

module.exports = ExpansesCodesLogic;