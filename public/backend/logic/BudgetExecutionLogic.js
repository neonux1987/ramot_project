const BudgetExecutionDao = require('../dao/BudgetExecutionDao');

class BudgetExecutionLogic {

  constructor(connection) {
    this.bed = new BudgetExecutionDao(connection);
  }

  getAllBudgetExecutions(params) {
    //params.buildingName = Helper.trimSpaces(params.buildingName);
    params.quarterQuery = this.getQuarterQuery(params.quarter);
    return this.bed.getAllBudgetExecutions(params);
  }

  getBudgetExecution(params) {
    params.quarterQuery = this.getQuarterQuery(params.quarter);
    return this.bed.getBudgetExecution(params);
  }

  async updateBudgetExecution(params) {

    //get the month name in english
    //let monthEngString = Helper.getCurrentMonthEng(params.month);
    //params.month = monthEngString;

    let result = await this.getBudgetExecution(params).then((result) => result).error((error) => { throw error });
    result = result[0];
    result["total_execution"] -= result[params.month + "_budget_execution"];
    result[params.month + "_budget_execution"] = params.totalSum;
    result["total_execution"] += params.totalSum;

    result["difference"] = result["total_budget"] - result["total_execution"];

    //if there is no value in the sum, reset
    //the difference back to 0 too
    if (params.totalSum === 0) {
      result["difference"] = 0;
    }

    let newData = {
      total_execution: result["total_execution"],
      difference: result["difference"]
    };

    newData[params.month + "_budget_execution"] = result[params.month + "_budget_execution"];

    params.newData = newData;
    params.summarized_section_id = params.expanse.summarized_section_id;

    this.bed.updateBudgetExecution(params);
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

}



module.exports = BudgetExecutionLogic;