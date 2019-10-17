const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
const GeneralSettingsLogic = require('../logic/GeneralSettingsLogic');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const Helper = require('../../helpers/Helper');

class SummarizedBudgetTransactions {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionLogic = new BudgetExecutionLogic(connection);
    this.summarizedBudgetLogic = new SummarizedBudgetLogic(connection);
    this.generalSettingsLogic = new GeneralSettingsLogic(connection);
    this.registeredYearsLogic = new RegisteredYearsLogic(connection);
  }

  /**
   * creates empty report for the new budget execution table
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyBudgetExec(buildingName, date) {

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    //if we get a result it means the month
    //is already created
    if (registeredYear.length > 0) {
      trx.commit();
      return;
    }

    await this.summarizedBudgetLogic.createEmptyReport(buildingName, date, trx);

    trx.commit();

    return this.summarizedBudgetLogic.getBuildingSummarizedBudgetTrx(buildingName, date, trx);

  }

}

module.exports = SummarizedBudgetTransactions;