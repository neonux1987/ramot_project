const Helper = require('../../helpers/Helper');
const MonthExpansesDao = require('../dao/MonthExpansesDao');
const BudgetExecutionLogic = require('./BudgetExecutionLogic');
const BudgetExecutionDao = require('../dao/BudgetExecutionDao');

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

  addNewMonthExpanse(params) {
    //prepare the expanse obejct, remove all the unneccessary 
    //fields so it can be saved.
    const expanseToInsert = {
      year: params.expanse.year,
      month: params.expanse.month,
      supplierName: params.expanse.supplierName,
      expanses_code_id: params.expanse.expanses_code_id,
      sum: params.expanse.sum,
      tax: params.expanse.tax,
      notes: params.expanse.notes
    };
    return this.med.addNewMonthExpanse(params.buildingName, expanseToInsert);
  }

  updateMonthExpanseTrx(date = Object, buildingName = String, expanse = Object, trx) {

    //prepare the expanse obejct, remove all the unneccessary 
    //fields so it can be saved.
    const expanseToUpdate = { supplierName: expanse.supplierName, sum: expanse.sum, tax: expanse.tax, notes: expanse.notes };
    //update the expanse
    return this.med.updateMonthExpanseTrx(buildingName, expanse.id, expanseToUpdate, trx)
      .then(() => {
        //get all the expanses by summarized sections id
        return this.med.getMonthExpansesBySummarizedSectionIdTrx(buildingName, date, expanse.summarized_section_id, trx);
      })
      .then((expanses) => {
        //calculate total sum of the received expanses
        const totalSum = MonthExpansesLogic.calculateExpansesSum(expanses);
        return totalSum;
      })
      .catch(error => { throw error });

  }

  static calculateExpansesSum(expanses) {
    let totalSum = 0;
    for (let i = 0; i < expanses.length; i++) {
      totalSum += expanses[i].sum;
    }
    return totalSum;
  }

  deleteMonthExpanse(params) {
    return this.med.deleteMonthExpanse(params);
  }

}

module.exports = MonthExpansesLogic;