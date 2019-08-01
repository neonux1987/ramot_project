const BudgetExecutionDao = require('../dao/BudgetExecutionDao');

class BudgetExecutionLogic {

  constructor(connection) {
    this.bed = new BudgetExecutionDao(connection);
    this.generalSettingsDao = new GeneralSettingsDao(connection);
  }

  getAllBudgetExecutions(params) {
    //params.buildingName = Helper.trimSpaces(params.buildingName);
    params.quarterQuery = BudgetExecutionLogic.getQuarterQuery(params.date.quarter);
    return this.bed.getAllBudgetExecutions(params);
  }

  getBudgetExecution(params) {
    params.quarterQuery = BudgetExecutionLogic.getQuarterQuery(params.date.quarter);
    return this.bed.getBudgetExecution(params);
  }

  updateBudgetExecutonTrx({ buildingName = String, date = Object, quarterQuery = String, summarized_section_id = Number, trx = Object }) {
    //get the quarter months query
    const quarterQuery = getQuarterQuery(date.quarter);
    //get budget execution of the selected date
    return this.budgetExecutionDao.getBudgetExecution(buildingName, date, quarterQuery, summarized_section_id, trx)
      .then((budgets) => {
        //get the tax field from general settings
        return this.generalSettingsDao.getGeneralSettings().then((settings) => {
          //prepare budget execution object to be updated
          let budgetExec = calculateBudget(budgets[0], totalSum, date, settings[0].tax);
          //update budget execution
          return this.budgetExecutionDao.updateBudgetExecution(buildingName, date, expanse.summarized_section_id, budgetExec, trx).then(() => budgets);
        })
      })
      .catch(error => { throw error });
  }

  /**
   * get the the desired quarter query to pull from the db
   */
  getQuarterQuery(quarterNum) {
    switch (quarterNum) {
      case 1: return BudgetExecutionDao.getQuarter1Query()
      case 2: return BudgetExecutionDao.getQuarter2Query()
      case 3: return BudgetExecutionDao.getQuarter3Query()
      case 4: return BudgetExecutionDao.getQuarter4Query()
    }
  }

  calculateBudget(budget, totalSum, date, tax) {
    totalSum = totalSum - ((totalSum * tax) / 100);
    budget["total_execution"] -= budget[`${date.month}_budget_execution`];
    budget[`${date.month}_budget_execution`] = totalSum;
    budget["total_execution"] += totalSum;
    budget["difference"] = budget["total_budget"] - budget["total_execution"];

    //if there is no value in the sum, reset
    //the difference back to 0 too
    if (totalSum === 0) {
      budget["difference"] = 0.0;
    }

    let newData = {
      total_execution: budget["total_execution"],
      difference: budget["difference"]
    };

    newData[date.month + "_budget_execution"] = budget[date.month + "_budget_execution"];
    return newData;
  }

}



module.exports = BudgetExecutionLogic;