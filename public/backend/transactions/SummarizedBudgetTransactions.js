const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const Helper = require('../../helpers/Helper');

class SummarizedBudgetTransactions {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionLogic = new BudgetExecutionLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.generalSettingsLogic = new GeneralSettingsLogic();
  }

  /**
   * creates empty report for the new budget execution table
   * @param {*} buildingName 
   * @param {*} date 
   */
  createEmptyBudgetExec(buildingName, date) {

    return this.connection.transaction((trx) => {
      return this.summarizedBudgetLogic.createEmptySummarizedBudget(buildingName, date, trx);
    })//end transaction
      .catch((error) => {
        console.log(error);
        throw new Error(error.message)
      });

  }

}

module.exports = SummarizedBudgetTransactions;