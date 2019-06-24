const Helper = require('../../helpers/Helper');
const MonthExpansesDao = require('../dao/MonthExpansesDao');
const BudgetExecutionLogic = require('./BudgetExecutionLogic');

const TAX_NUM = 17;

class MonthExpansesLogic {

  constructor(connection) {
    this.bel = new BudgetExecutionLogic(connection);
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


    return this.getMonthExpansesBySummarizedSectionId(params).then((result) => {



    })

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

    let expanseToSave = { supplierName: params.expanse.supplierName, sum: params.expanse.sum, notes: params.expanse.notes }; console.log(expanseToSave);
    // return this.med.updateMonthExpanse(params.expanse.id, params.buildingName, expanseToSave);
  }

  addNewMonthExpanse(params) {
    params.buildingName = Helper.trimSpaces(params.buildingName);
    return this.med.addNewMonthExpanse(params.expanse.id, params.buildingName, expanseToSave);
  }

}

module.exports = MonthExpansesLogic;