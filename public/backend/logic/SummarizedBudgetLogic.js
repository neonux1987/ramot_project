const Helper = require('../../helpers/Helper');
const SummarizedBudgetDao = require('../dao/SummarizedBudgetDao');

class SummarizedBudgetLogic {

  constructor(connection) {
    this.sbd = new SummarizedBudgetDao(connection);
  }

  getBuildingSummarizedBudget(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.sbd.getBuildingSummarizedBudget(params);
  }

  updateSummarizedBudget(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.sbd.updateSummarizedBudget(params);
  }

}

module.exports = SummarizedBudgetLogic;