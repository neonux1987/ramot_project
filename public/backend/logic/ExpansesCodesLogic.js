const ExpansesCodesDao = require('../dao/ExpansesCodesDao');

class ExpansesCodesLogic {

  constructor(connection) {
    this.ec = new ExpansesCodesDao(connection);
  }

  getExpansesCodes(params) {
    return this.ec.getExpansesCodes(params);
  }

  updateExpanseCode(params) {
    return this.ec.updateExpanseCode(params);
  }

  addExpanseCode(params) {
    return this.ec.addExpanseCode(params);
  }

}



module.exports = ExpansesCodesLogic;