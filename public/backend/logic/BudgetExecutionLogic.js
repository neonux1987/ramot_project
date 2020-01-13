const BudgetExecutionDao = require('../dao/BudgetExecutionDao');
const GeneralSettingsDao = require('../dao/GeneralSettingsDao');
const MonthlyStatsLogic = require('./MonthlyStatsLogic');
const QuarterlyStatsLogic = require('./QuarterlyStatsLogic');
const SummarizedSectionsLogic = require('./SummarizedSectionsLogic');
const SummarizedBudgetLogic = require('./SummarizedBudgetLogic');
const RegisteredQuartersLogic = require('./RegisteredQuartersLogic');
const MonthExpansesDao = require('../dao/MonthExpansesDao');
const Helper = require('../../helpers/Helper');
const connectionPool = require('../connection/ConnectionPool');

class BudgetExecutionLogic {

  constructor() {
    this.budgetExecutionDao = new BudgetExecutionDao();
    this.generalSettingsDao = new GeneralSettingsDao();
    this.monthlyStatsLogic = new MonthlyStatsLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.quarterlyStatsLogic = new QuarterlyStatsLogic();
    this.summarizedSectionsLogic = new SummarizedSectionsLogic();
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
    this.monthExpansesDao = new MonthExpansesDao();
  }

  getAllBudgetExecutionsTrx(buildingName, date, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getAllBudgetExecutionsTrx(buildingName, date, quarterQuery, trx);
  }

  getBudgetExecutionsByRange(buildingName, date, range) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionsByRange(buildingName, date, range, quarterQuery).then((data) => {

      return this.budgetExecutionDao.dataRowCount(buildingName, date).then((count) => {
        return {
          data,
          info: {
            count: count
          }
        }
      })

    });
  }

  getBudgetExecutionTrx(buildingName = String, date = Object, summarized_section_id = Number, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionTrx(buildingName, date, quarterQuery, summarized_section_id, trx);
  }

  getBudgetExecutionById(buildingName = String, date = Object, id = Number) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionById(buildingName, date, quarterQuery, id);
  }

  async updateBudgetExecutionTrx({ buildingName = String, date = Object, summarized_section_id = Number, budgetExec = Object, special = false }, trx) {

    if (trx === undefined) {
      trx = await connectionPool.getTransaction();
    }

    //update budget execution
    await this.budgetExecutionDao.updateBudgetExecutionTrx(buildingName, date, summarized_section_id, budgetExec, trx);

    //get all budget executions
    const allBudgetExecutions = await this.getAllBudgetExecutionsTrx(buildingName, date, trx);

    //if a budget of specific month was updated
    //then month will exist
    if (date.month) {

      //dont update stats if it's a special code 
      //that starts with special prefix
      if (!special) {
        //calculate month stats
        const preparedMonthStatsObj = this.prepareMonthStatsObj(date.month, allBudgetExecutions);

        //update month stats
        await this.monthlyStatsLogic.updateMonthStatsTrx(buildingName, date, {
          outcome: preparedMonthStatsObj.outcome,
          income: preparedMonthStatsObj.income
        }, trx);

        //update quarter stats
        await this.quarterlyStatsLogic.updateQuarterStatsTrx(buildingName, date, {
          outcome: preparedMonthStatsObj.totalOutcome,
          income: preparedMonthStatsObj.totalIncome
        }, trx);
      }

    }

    //get budget execution after it was updated
    const budgetExecution = await this.getBudgetExecutionTrx(buildingName, date, summarized_section_id, trx);

    //get budget execution after it was updated
    const summarizedBudgetObj = await this.summarizedBudgetLogic.getSummarizedBudgetByIdTrx(summarized_section_id, buildingName, date, trx);

    const preparedSumBudgetObj = this.prepareSummarizedBudgetObj(date.quarter, budgetExecution[0].total_budget, budgetExecution[0].total_execution, summarizedBudgetObj[0]);

    //update summarized budget data
    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx({ summarized_section_id, summarizedBudget: preparedSumBudgetObj, buildingName, date, special }, trx);

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

  prepareMonthStatsObj(monthEng, budgetExecArr) {

    let totalOutcome = 0;
    let totalIncome = 0;
    let outcome = 0;
    let income = 0;

    for (let i = 0; i < budgetExecArr.length; i++) {

      if (budgetExecArr[i].section !== "הכנסות מיוחדות" || budgetExecArr[i].summarized_section_id !== 31) {
        //calculate month outcome
        outcome += budgetExecArr[i][`${monthEng}_budget_execution`];
        //calculate month income
        income += budgetExecArr[i][`${monthEng}_budget`];
        //calculate quarter outcome
        totalOutcome += budgetExecArr[i]["total_execution"];
        //calculate quarter income
        totalIncome += budgetExecArr[i]["total_budget"];
      }

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
      trx = await connectionPool.getTransaction();
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

    //all the months of a specific quarter
    const months = Helper.getQuarterMonthsHeb(date.quarter);

    //generate empty monthly stats (3 empty months)
    const monthlyStatsArr = this.generateEmptyMonthlyStats(months, date);

    // batch insert the months
    await this.monthlyStatsLogic.batchInsert(buildingName, monthlyStatsArr, trx);

    //register quarter
    await this.registeredQuartersLogic.registerNewQuarter(buildingName, { quarter: date.quarter, quarterHeb: date.quarterHeb, year: date.year }, trx);

    //new data
    const returnData = await this.getAllBudgetExecutionsTrx(buildingName, date, trx);

    //call to create summarized budget report data
    await this.summarizedBudgetLogic.createEmptyReport(buildingName, date, trx);

    //return the new added data
    return returnData;

  }

  generateEmptyMonthlyStats(months, date) {
    const data = [];
    //populate the array with empty month stats objects
    for (let i = 0; i < months.length; i++) {
      data.push({
        year: date.year,
        quarter: date.quarter,
        month: months[i],
        income: 0,
        outcome: 0
      });
    }
    return data;
  }

  async deleteBudgetExecution({ buildingName, date, id }) {

    const quarterMonths = Helper.getQuarterMonths(date.quarter);

    const trx = await connectionPool.getTransaction();

    const budgetExecution = await this.getBudgetExecutionById(buildingName, date, id, trx);

    const ids = [];

    for (let i = 0; i < quarterMonths.length; i++) {
      const newDate = {
        year: date.year,
        month: quarterMonths[i]
      };

      const monthExpanses = await this.monthExpansesDao.getMonthExpansesBySummarizedSectionIdTrx(
        buildingName,
        newDate,
        budgetExecution[0].summarized_section_id,
        trx
      );

      // extract the ids of te month expanses
      // and put them in array
      monthExpanses.forEach(item => {
        ids.push(item.id);
      })

    }

    this.monthExpansesDao.deleteMonthExpansesBulkByIds(buildingName, ids, trx);

  }

}



module.exports = BudgetExecutionLogic;