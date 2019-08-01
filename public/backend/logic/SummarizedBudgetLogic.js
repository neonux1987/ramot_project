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

  updateSummarizedBudgetTrx({ budgets = Array, buildingName = String, date = Object, trx = Object }) {
    //prepare the params
    const params = {
      summarized_section_id: budgets[0].summarized_section_id,
      buildingName,
      date: {
        year: date.year
      }
    }

    return this.summarizedBudget.getBuildingSummarizedBudgetSingleTrx(params, trx).then((sumBudget) => {

      const quarterBudgetLabel = `${date.quarterEng}_budget`;
      const quarterExecutionLabel = `${date.quarterEng}_execution`;

      //calculate year total budget
      //substract the previous quarter budget that will be updated
      //from total year budget and then add the new quarter budget to it
      let year_total_budget = (sumBudget[0].year_total_budget - sumBudget[0][quarterBudgetLabel]) + budgets[0].total_budget;

      //calculate year total execution
      //substract the previous quarter execution that will be updated
      //from total year execution and then add the new quarter execution to it
      let year_total_execution = (sumBudget[0].year_total_execution - sumBudget[0][quarterExecutionLabel]) + budgets[0].total_execution;

      //add the object tat will be added to the database to params
      params.data = {
        [quarterBudgetLabel]: budgets[0].total_budget,//quarter budget
        [quarterExecutionLabel]: budgets[0].total_execution,//quarter execution
        year_total_budget: year_total_budget,
        year_total_execution: year_total_execution,//year execution
        notes: budgets[0].notes//notes
      };
      return this.summarizedBudget.updateSummarizedBudgetTrx(params, trx)
    }).catch(error => { throw error; });
  }

}

module.exports = SummarizedBudgetLogic;