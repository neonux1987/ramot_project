const BudgetExecutionDao = require('../dao/BudgetExecutionDao');
const GeneralSettingsDao = require('../dao/GeneralSettingsDao');
const MonthTotalLogic = require('./MonthTotalLogic');
const SummarizedSectionsLogic = require('./SummarizedSectionsLogic');
const RegisteredQuartersLogic = require('./RegisteredQuartersLogic');
const Helper = require('../../helpers/Helper');

class BudgetExecutionLogic {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionDao = new BudgetExecutionDao(connection);
    this.generalSettingsDao = new GeneralSettingsDao(connection);
    this.monthTotalLogic = new MonthTotalLogic(connection);
    this.summarizedSectionsLogic = new SummarizedSectionsLogic();
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
  }

  getAllBudgetExecutionsTrx(buildingName, date, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getAllBudgetExecutionsTrx(buildingName, date, quarterQuery, trx);
  }

  getBudgetExecutionTrx(buildingName = String, date = Object, summarized_section_id = Number, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionTrx(buildingName, date, quarterQuery, summarized_section_id, trx);
  }

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
        return this.budgetExecutionDao.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx).then(() => budgetExec);
      });
  }

  async updateBudgetExecutionTrx(buildingName = String, date = Object, summarized_section_id = Number, budgetExec = Object, trx = await this.connection.transaction()) {

    //update budget execution
    await this.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx);

    //get all budget executions
    const allBudgetExecutions = await this.getAllBudgetExecutionsTrx(buildingName, date, trx);

    const calculatedObj = this.calculateTotalExec(date.month, allBudgetExecutions);

    //update month total execution (total expanses)
    await this.updateMonthTotalTrx(buildingName, date, {
      total_expanses: calculatedObj.monthTotalExecution
    }, trx);

    //update quarter total execution (total expanses)
    await this.quarterTotalLogic.updateQuarterTotalTrx(buildingName, date, {
      total_expanses: calculatedObj.totalExecution,
      total_budget: calculatedObj.totalBudget
    }, trx);

    //get budget execution after it was updated
    const budgetExecution = await this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx);

    const summarizedBudgetObj = this.prepareSummarizedBudgetObj(quarter, budgetExecution);

    //update summarized budget data
    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx(summarizedBudgetObj, buildingName, date, trx);

  }

  static prepareSummarizedBudgetObj(quarter, budgetExecution) {

    return {
      [`quarter${quarter}_budget`]: budgetExecution.total_budget,
      [`quarter${quarter}_execution`]: budgetExecution.total_execution,
    }

  }

  prepareBudgetExecutonObj(budget = Object, date = Object) {

    let totalSum = 0;

    //we need to calculate each expanse seperately 
    //because in a rare case, they could have 
    //different tax values
    for (let i = 0; i < monthExpanses.length; i++) {
      totalSum += Helper.calculateWithoutTax(monthExpanses[i].sum, monthExpanses[i].tax)
    }

    //subtract month's old execution value from the total execution
    budget["total_execution"] -= budget[`${date.month}_budget_execution`];
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
      total_execution: budget["total_budget"],
      difference: budget["difference"],
      [date.month + "_budget_execution"]: budget[date.month + "_budget_execution"]
    };

    return BudgetExecutionObj;
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

  static deductExpanse(expanse, budgetExecObj) {

    //convert sum to sum without a tax fee
    const expanseValTaxless = Helper.calculateWithoutTax(expanse.sum, expanse.tax);

    //get rid of the old month execution from the total execution
    let budgetExecTotalExec = budgetExecObj["total_execution"] - budgetExecObj[`${expanse.month}_budget_execution`];
    //deduct the expanse from month execuion
    const budgetExec = budgetExecObj[`${expanse.month}_budget_execution`] - expanseValTaxless;
    //add the new month execution
    budgetExecTotalExec = budgetExecTotalExec + budgetExec;
    //calculate the difference
    const budgetExecDiff = budgetExecObj["total_budget"] - budgetExecTotalExec;

    return {
      [`${expanse.month}_budget_execution`]: budgetExec,
      total_execution: budgetExecTotalExec,
      difference: budgetExecDiff
    }

  }

  calculateTotalExec(monthEng, budgetExecArr) {

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
    return this.budgetExecutionDao.batchInsert(buildingName, quarter, rows, trx);
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