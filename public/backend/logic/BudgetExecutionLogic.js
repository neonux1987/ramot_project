const BudgetExecutionDao = require('../dao/BudgetExecutionDao');

class BudgetExecutionLogic {

  constructor(connection) {
    this.bed = new BudgetExecutionDao(connection);
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

  /**
   * get the the desired quarter query to pull from the db
   */
  static getQuarterQuery(quarterNum) {
    switch (quarterNum) {
      case 1: return BudgetExecutionDao.getQuarter1Query()
      case 2: return BudgetExecutionDao.getQuarter2Query()
      case 3: return BudgetExecutionDao.getQuarter3Query()
      case 4: return BudgetExecutionDao.getQuarter4Query()
    }
  }

  static calculateBudget(budget, totalSum, date) {
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