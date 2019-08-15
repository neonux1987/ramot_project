const BudgetExecutionDao = require('../dao/BudgetExecutionDao');
const GeneralSettingsDao = require('../dao/GeneralSettingsDao');
const MonthTotalBudgetAndExpansesLogic = require('./MonthTotalBudgetAndExpansesLogic');
const Helper = require('../../helpers/Helper');

class BudgetExecutionLogic {

  constructor(connection) {
    this.bed = new BudgetExecutionDao(connection);
    this.generalSettingsDao = new GeneralSettingsDao(connection);
    this.monthTotalBudgetAndExpansesLogic = new MonthTotalBudgetAndExpansesLogic(connection);
  }

  getAllBudgetExecutions(params, trx) {
    //params.buildingName = Helper.trimSpaces(params.buildingName);
    params.quarterQuery = BudgetExecutionLogic.getQuarterQuery(params.date.quarter);
    return this.bed.getAllBudgetExecutionsTrx(params, trx);
  }

  getBudgetExecutionTrx(buildingName = String, date = Object, summarized_section_id = Number, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.bed.getBudgetExecutionTrx(buildingName, date, quarterQuery, summarized_section_id, trx);
  }

  /* updateBudgetExecutionTrx(totalSum = Number, budgetExec = Object, buildingName = String, date = Object, summarized_section_id = Number, trx) {
    //get budget execution of the selected date
    return this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx)
      .then((budgets) => {
        //get the tax field from general settings
        return this.generalSettingsDao.getGeneralSettingsTrx(trx).then((settings) => {
          if (totalSum !== null) {
            //prepare budget execution object to be updated
            budgetExec = BudgetExecutionLogic.calculateExecution(budgets[0], totalSum, date, settings[0].tax);
            //update month total expanses table
            this.monthTotalBudgetAndExpansesLogic.updateMonthTotalBudgetAndExpansesTrx(buildingName, date, totalSum, settings[0].tax, trx)
              .catch(error => { throw error });
          }
          //update budget execution
          return this.bed.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx).then(() => {
            //return this.bed.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx);
          });
        })
      })
      .catch(error => { throw error });
  } */

  updateBudgetExecutionTrx(totalSum = Number, budgetExec = Object, buildingName = String, date = Object, summarized_section_id = Number, tax = Number, trx) {
    //get budget execution of the selected date
    return this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx)
      .then((budgets) => {
        //except the total month budget and total monh execution
        //they don't need the difference calculation
        if (totalSum !== null && budgets[0].summarized_section_id !== 32 && budgets[0].summarized_section_id !== 33) {
          //prepare budget execution object to be updated
          budgetExec = BudgetExecutionLogic.calculateExecution(budgets[0], totalSum, date, tax);
        }
        //update budget execution
        return this.bed.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx).then((budget) => budget);
      })
      .catch(error => { throw error });
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

  static calculateExecution(budget, totalSum, date, tax) {
    totalSum = Helper.calculateWithoutTax(totalSum, tax);
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

  static calculateTotalExec(quarter, result) {
    const monthNames = Helper.getQuarterMonths(quarter);

    const saveObject = {
      [`${monthNames[0]}_budget_execution`]: 0,
      [`${monthNames[1]}_budget_execution`]: 0,
      [`${monthNames[2]}_budget_execution`]: 0
    }

    for (let i = 0; i < result.length; i++) {
      if (result[i].summarized_section_id !== 32 && result[i].summarized_section_id !== 33) {
        //calculate budget
        saveObject[`${monthNames[0]}_budget_execution`] += result[i][`${monthNames[0]}_budget_execution`];
        saveObject[`${monthNames[1]}_budget_execution`] += result[i][`${monthNames[1]}_budget_execution`];
        saveObject[`${monthNames[2]}_budget_execution`] += result[i][`${monthNames[2]}_budget_execution`];
      }
    }
    //calculate the total budget
    saveObject.total_execution = saveObject[`${monthNames[0]}_budget_execution`] + saveObject[`${monthNames[1]}_budget_execution`] + saveObject[`${monthNames[2]}_budget_execution`];
    return saveObject;
  }

}



module.exports = BudgetExecutionLogic;