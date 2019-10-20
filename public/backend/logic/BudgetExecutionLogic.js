const BudgetExecutionDao = require('../dao/BudgetExecutionDao');
const GeneralSettingsDao = require('../dao/GeneralSettingsDao');
const MonthTotalLogic = require('./MonthTotalLogic');
const SummarizedSectionsLogic = require('./SummarizedSectionsLogic');
const RegisteredQuartersLogic = require('./RegisteredQuartersLogic');
const Helper = require('../../helpers/Helper');

class BudgetExecutionLogic {

  constructor(connection) {
    this.bed = new BudgetExecutionDao(connection);
    this.generalSettingsDao = new GeneralSettingsDao(connection);
    this.monthTotalLogic = new MonthTotalLogic(connection);
    this.summarizedSectionsLogic = new SummarizedSectionsLogic();
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
  }

  getAllBudgetExecutionsTrx(buildingName, date, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.bed.getAllBudgetExecutionsTrx(buildingName, date, quarterQuery, trx);
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

  /**
   * update execution
   * @param {*} totalSum 
   * @param {*} buildingName 
   * @param {*} date 
   * @param {*} summarized_section_id 
   * @param {*} tax 
   * @param {*} trx 
   */
  updateExecutionTrx(monthExpanses = Array, buildingName = String, date = Object, summarized_section_id = Number, tax = Number, trx) {
    //get budget execution of the selected date
    return this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx)
      .then((budgets) => {
        //prepare budget execution object to be updated
        const budgetExec = BudgetExecutionLogic.calculateExecution(budgets[0], monthExpanses, date, tax);
        //update budget execution
        return this.bed.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx).then(() => budgetExec);
      });
  }

  updateBudgetExecutionTrx(totalSum = Number, budgetExec = Object, buildingName = String, date = Object, summarized_section_id = Number, tax = Number, trx) {
    //get budget execution of the selected date
    return this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx)
      .then((budgets) => {
        //except the total month budget and total monh execution
        //they don't need the difference calculation
        if (totalSum !== null) {
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

  /* static calculateExecution(budget, totalSum, date, tax) {
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
  } */

  /**
   * calculate and create a budget execution object
   * with the new execution value total execution and difference
   * @param {*} budget 
   * @param {*} monthExpanses 
   * @param {*} date 
   */
  static calculateExecution(budget = Object, monthExpanses = Array, date = Object) {

    let totalSum = 0;

    //we need to calculate each expanse seperately 
    //because in a rare case, they could have 
    //different tax values
    for (let i = 0; i < monthExpanses.length; i++) {
      totalSum += Helper.calculateWithoutTax(monthExpanses[i].sum, monthExpanses[i].tax)
    }

    //subtract month's old execution value from the total execution
    budget["total_execution"] -= budget[`${date.month}_budget_execution`];
    //update month's exectuion with the new value
    budget[`${date.month}_budget_execution`] = totalSum;
    //update the total execuion wit the new month's execution value
    budget["total_execution"] += totalSum;
    //caluclate difference
    budget["difference"] = budget["total_budget"] - budget["total_execution"];

    //if there is no value in the sum, reset
    //the difference back to 0 too
    if (totalSum === 0) {
      budget["difference"] = 0.0;
    }

    //prepare budget execution object
    let BudgetExecutionObj = {
      total_execution: budget["total_execution"],
      difference: budget["difference"],
      [date.month + "_budget_execution"]: budget[date.month + "_budget_execution"]
    };

    return BudgetExecutionObj;
  }

  static calculateTotalExec(monthEng, budgetExecArr) {

    let monthTotalExecution = 0;
    let totalExecution = 0;
    let totalBudget = 0;

    for (let i = 0; i < budgetExecArr.length; i++) {
      //calculate month total execution
      monthTotalExecution += budgetExecArr[i][`${monthEng}_budget_execution`];
      //calculate quarter total execution
      totalExecution += budgetExecArr[i]["total_execution"];
      //calculate total budget
      totalBudget += budgetExecArr[i]["total_budget"];
    }

    return {
      monthTotalExecution,
      totalExecution,
      totalBudget
    };
  }

  batchInsert(buildingName, quarter, rows, trx) {
    return this.bed.batchInsert(buildingName, quarter, rows, trx);
  }

  prepareDefaultBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].id,
        year: date.year,
        quarter: date.quarter
      })
    }
    return newData;
  }

  prepareBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].summarized_section_id,
        year: date.year,
        quarter: date.quarter
      })
    }
    return newData;
  }

  /**
   * creates empty report for the new budget execution table
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyReport(buildingName, date, trx) {

    const quarter = date.quarter > 1 ? date.quarter - 1 : 4;//if quarter is 0 then set to quarter 4 of previous year
    const year = quarter === 4 ? date.year - 1 : date.year;//if the quarter is 4, go to previous year

    //previous date
    const newDate = {
      quarter: quarter,
      year: year
    };

    //get all the budget executions of the previous quarter if exists
    const budgetExec = await this.getAllBudgetExecutionsTrx(buildingName, newDate, trx);

    //0 means no budget execuion exist of previous quarter
    if (budgetExec.length === 0) {
      const defaultSections = await this.summarizedSectionsLogic.getAllSummarizedSectionsTrx(trx);
      //prepare the data for insertion
      const preparedDefaultSections = this.prepareDefaultBatchInsertion(defaultSections, date);
      //insert the batch
      await this.batchInsert(buildingName, date.quarter, preparedDefaultSections, trx);
    } else {
      //prepare the data for insertion
      const preparedSections = this.prepareBatchInsertion(budgetExec, date);
      //insert the batch
      await this.batchInsert(buildingName, date.quarter, preparedSections, trx);
    }

    //register quarter
    await this.registeredQuartersLogic.registerNewQuarter(buildingName, { quarter: date.quarter, quarterHeb: date.quarterHeb, year: date.year }, trx);

    return Promise.resolve();

  }

}



module.exports = BudgetExecutionLogic;