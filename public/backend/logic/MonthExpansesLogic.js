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

  async updateMonthExpanse(params) {

    params.buildingName = Helper.trimSpaces(params.buildingName);

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    let expanseToSave = { supplierName: params.expanse.supplierName, sum: params.expanse.sum, notes: params.expanse.notes };
    this.med.updateMonthExpanse(params, trx);

    this.med.getMonthExpansesBySummarizedSectionId(params, trx)

    this.bed.getBudgetExecution(params, trx);

    trx.then((expanses) => {
      calculateExpansesSum(expanses);
      return this.bel.updateBudgetExecution(params, trx);
    });

    //get all the expanses by summarized section id
    let result = await this.getMonthExpansesBySummarizedSectionId(params).catch(error => console.log(error));
    let totalSum = 0;
    for (let i = 0; i < result.length; i++) {
      //set the sum of the new expanse instead of the old
      if (result[i].id === params.expanse.id) {
        result[i].sum = params.expanse.sum;
      }
      totalSum += result[i].sum;
    }
    //set the sum to the params and update the budget execution table
    //params.totalSum = totalSum - ((totalSum * TAX_NUM) / 100);

    //this.bel.updateBudgetExecution(params);

    //let expanseToSave = { supplierName: params.expanse.supplierName, sum: params.expanse.sum, notes: params.expanse.notes }; console.log(expanseToSave);
    // return this.med.updateMonthExpanse(params.expanse.id, params.buildingName, expanseToSave);
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

  addNewMonthExpanse(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.med.addNewMonthExpanse(params.expanse.id, params.buildingName, expanseToSave);
  }

}

module.exports = MonthExpansesLogic;