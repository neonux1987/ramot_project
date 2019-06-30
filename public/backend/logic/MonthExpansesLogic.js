const Helper = require('../../helpers/Helper');
const MonthExpansesDao = require('../dao/MonthExpansesDao');
const BudgetExecutionLogic = require('./BudgetExecutionLogic');
const BudgetExecutionDao = require('../dao/BudgetExecutionDao');

const TAX_NUM = 17;

class MonthExpansesLogic {

  constructor(connection) {
    this.connection = connection;
    this.bel = new BudgetExecutionLogic(connection);
    this.bed = new BudgetExecutionDao(connection);
    this.med = new MonthExpansesDao(connection);
  }

  getAllMonthExpanses(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.med.getAllMonthExpanses(params);
  }

  getMonthExpansesBySummarizedSectionId(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.med.getMonthExpansesBySummarizedSectionId(params);
  }

  static calculateExpansesSum(expanses) {
    let totalSum = 0;
    for (let i = 0; i < expanses.length; i++) {
      totalSum += expanses[i].sum;
    }
    return totalSum;
  }

  static prepareExpanseObj(expanse) {
    return { supplierName: expanse.supplierName, sum: expanse.sum, notes: expanse.notes };
  }

}

module.exports = MonthExpansesLogic;