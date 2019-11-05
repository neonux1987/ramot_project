const BudgetExecutionDao = require('../dao/BudgetExecutionDao');
const GeneralSettingsDao = require('../dao/GeneralSettingsDao');
const MonthTotalLogic = require('./MonthTotalLogic');
const QuarterTotalLogic = require('./QuarterTotalLogic');
const SummarizedSectionsLogic = require('./SummarizedSectionsLogic');
const SummarizedBudgetLogic = require('./SummarizedBudgetLogic');
const RegisteredQuartersLogic = require('./RegisteredQuartersLogic');
const Helper = require('../../helpers/Helper');

class BudgetExecutionLogic {

  constructor(connection) {
    this.connection = connection;
    this.budgetExecutionDao = new BudgetExecutionDao(connection);
    this.generalSettingsDao = new GeneralSettingsDao(connection);
    this.monthTotalLogic = new MonthTotalLogic(connection);
    this.summarizedBudgetLogic = new SummarizedBudgetLogic(connection);
    this.quarterTotalLogic = new QuarterTotalLogic(connection);
    this.summarizedSectionsLogic = new SummarizedSectionsLogic(connection);
    this.registeredQuartersLogic = new RegisteredQuartersLogic(connection);
  }

  getAllBudgetExecutionsTrx(buildingName, date, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getAllBudgetExecutionsTrx(buildingName, date, quarterQuery, trx);
  }

  getBudgetExecutionTrx(buildingName = String, date = Object, summarized_section_id = Number, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionTrx(buildingName, date, quarterQuery, summarized_section_id, trx);
  }

  async updateBudgetExecutionTrx({ buildingName = String, date = Object, summarized_section_id = Number, budgetExec = Object }, trx) {

    if (trx === undefined) {
      trx = await this.connection.transaction();
    }

    //update budget execution
    await this.budgetExecutionDao.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx);

    //get all budget executions
    const allBudgetExecutions = await this.getAllBudgetExecutionsTrx(buildingName, date, trx);

    //if a budget of specific month was updated
    //then month will exist
    if (date.month) {

      //calculate month total
      const preparedMonthTotalObj = this.prepareMonthTotalObj(date.month, allBudgetExecutions);

      //update month total execution (total expanses)
      await this.monthTotalLogic.updateMonthTotalTrx(buildingName, date, {
        outcome: preparedMonthTotalObj.outcome,
        income: preparedMonthTotalObj.income
      }, trx);

      //update quarter total execution (total expanses)
      await this.quarterTotalLogic.updateQuarterTotalTrx(buildingName, date, {
        outcome: preparedMonthTotalObj.totalOutcome,
        income: preparedMonthTotalObj.totalIncome
      }, trx);
    }

    //get budget execution after it was updated
    const budgetExecution = await this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx);

    //get budget execution after it was updated
    const summarizedBudgetObj = await this.summarizedBudgetLogic.getSummarizedBudgetByIdTrx(summarized_section_id, buildingName, date, trx);

    const preparedSumBudgetObj = this.prepareSummarizedBudgetObj(date.quarter, budgetExecution[0].total_budget, budgetExecution[0].total_execution, summarizedBudgetObj[0]);

    //update summarized budget data
    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx({ summarized_section_id, summarizedBudget: preparedSumBudgetObj, buildingName, date }, trx);

  }

  prepareSummarizedBudgetObj(quarter, totalBudget, totalExecution, summarizedBudgetObj) {

    let total_execution = 0;
    let total_budget = 0;

    summarizedBudgetObj[`quarter${quarter}_budget`] = totalBudget;
    summarizedBudgetObj[`quarter${quarter}_execution`] = totalExecution;

    for (let i = 1; i <= 4; i++) {
      total_execution += summarizedBudgetObj[`quarter${i}_execution`];
      total_budget += summarizedBudgetObj[`quarter${i}_budget`];
    }

    return {
      [`quarter${quarter}_budget`]: summarizedBudgetObj[`quarter${quarter}_budget`],
      [`quarter${quarter}_execution`]: summarizedBudgetObj[`quarter${quarter}_execution`],
      year_total_execution: total_execution,
      year_total_budget: total_budget
    }

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

  prepareMonthTotalObj(monthEng, budgetExecArr) {

    let totalOutcome = 0;
    let totalIncome = 0;
    let outcome = 0;
    let income = 0;

    for (let i = 0; i < budgetExecArr.length; i++) {

      //calculate month total execution
      outcome += budgetExecArr[i][`${monthEng}_budget_execution`];
      //calculate month total budget
      income += budgetExecArr[i][`${monthEng}_budget`];
      //calculate quarter total execution
      totalOutcome += budgetExecArr[i]["total_execution"];
      //calculate total budget
      totalIncome += budgetExecArr[i]["total_budget"];
    }

    return {
      totalOutcome,
      totalIncome,
      outcome,
      income
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

    if (trx === undefined) {
      trx = await this.connection.transaction()
    }

    const registeredQuarter = await this.registeredQuartersLogic.getRegisteredQuarterTrx(buildingName, date.quarter, date.year, trx);

    //if the quarter is already registered
    //return empty promise
    if (registeredQuarter.length > 0) {
      trx.commit();
      return Promise.resolve([]);
    }

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

    //insert empty quarter total row
    await this.quarterTotalLogic.insertQuartertotal(buildingName, {
      year: date.year,
      quarter: date.quarter,
      income: 0,
      outcome: 0
    },
      trx);

    //all the months of a specific quarter
    const months = Helper.getQuarterMonths(date.quarter);
    //empty month total objects will be stores here
    const monthTotalArr = [];

    //populate the array with empty month total objects
    for(let i=0;i<months.length;i++){console.log(months[i]);
      monthTotalArr.push({
        year: date.year,
        quarter: date.quarter,
        month: months[i],
        income: 0,
        outcome: 0
      });
    }

    //insert empty month total rows
    await this.monthTotalLogic.batchInsert(buildingName,monthTotalArr,trx);

    //register quarter
    await this.registeredQuartersLogic.registerNewQuarter(buildingName, { quarter: date.quarter, quarterHeb: date.quarterHeb, year: date.year }, trx);

    //new data
    const returnData = await this.getAllBudgetExecutionsTrx(buildingName, date, trx);

    //call to create summarized budget report data
    await this.summarizedBudgetLogic.createEmptyReport(buildingName, date, trx);

    //return the new added data
    return returnData;

  }

}



module.exports = BudgetExecutionLogic;