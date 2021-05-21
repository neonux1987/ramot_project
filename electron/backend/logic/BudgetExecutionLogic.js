const BudgetExecutionDao = require('../dao/BudgetExecutionDao');
const MonthlyStatsLogic = require('./MonthlyStatsLogic');
const QuarterlyStatsLogic = require('./QuarterlyStatsLogic');
const SummarizedSectionsLogic = require('./SummarizedSectionsLogic');
const SummarizedBudgetLogic = require('./SummarizedBudgetLogic');
const SummarizedBudgetDao = require('../dao/SummarizedBudgetDao');
const RegisteredQuartersLogic = require('./RegisteredQuartersLogic');
const MonthExpansesDao = require('../dao/MonthExpansesDao');
const Helper = require('../../helpers/Helper');
const LogicError = require('../customErrors/LogicError');
const { asyncForEach } = require('../../helpers/utils');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');
const { Help } = require('@material-ui/icons');

class BudgetExecutionLogic {

  constructor() {
    this.budgetExecutionDao = new BudgetExecutionDao();
    this.monthlyStatsLogic = new MonthlyStatsLogic();
    this.summarizedBudgetLogic = new SummarizedBudgetLogic();
    this.quarterlyStatsLogic = new QuarterlyStatsLogic();
    this.summarizedSectionsLogic = new SummarizedSectionsLogic();
    this.registeredQuartersLogic = new RegisteredQuartersLogic();
    this.monthExpansesDao = new MonthExpansesDao();
    this.summarizedBudgetDao = new SummarizedBudgetDao();
    this.logger = logManager.getLogger();
  }

  getAllBudgetExecutionsTrx(buildingId, date, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getAllBudgetExecutionsTrx(buildingId, date, quarterQuery, trx);
  }

  getBudgetExecutionsByRange(buildingInfo, date, range) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);

    return this.budgetExecutionDao.getBudgetExecutionsByRange(buildingInfo, date, range, quarterQuery).then((data) => {

      return this.budgetExecutionDao.dataRowCount(buildingInfo.buildingId, date).then((count) => {
        return {
          data,
          info: {
            count: count
          }
        }
      })

    });
  }

  getAllByQuarter(buildingInfo, date) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getAllByQuarter(buildingInfo, date, quarterQuery)
  }

  getBudgetExecutionTrx(buildingId = String, date = Object, summarized_section_id = Number, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionTrx(buildingId, date, quarterQuery, summarized_section_id, trx);
  }

  getBudgetExecutionById(buildingId = String, date = Object, id = Number, trx) {
    const quarterQuery = BudgetExecutionLogic.getQuarterQuery(date.quarter);
    return this.budgetExecutionDao.getBudgetExecutionById(buildingId, date, quarterQuery, id, trx);
  }

  async addBudgetExecutionTrx({ buildingId = String, date = Object, payload = Object }) {

    const trx = await connectionPool.getTransaction();

    const returnedBudgetExecution = await this.getBudgetExecutionTrx(buildingId, date, payload.id, trx);

    if (returnedBudgetExecution.length > 0) {
      trx.rollback();
      throw new LogicError(`לא ניתן להוסיף שורה עם סעיף מסכם '${returnedBudgetExecution[0].section}' שכבר קיים`);
    }

    // prepare budget execution object
    const readyPayload = this.prepareBudgetExecutionForAdd(date, payload.id);

    // add budget execution
    const returnedId = await this.budgetExecutionDao.addBudgetExecution(buildingId, date, readyPayload, trx);

    // prepare summarized budget object for add
    const sammarizedBudgetPayload = this.prepareSammarizedBudgetForAdd(date, payload.id);

    await this.summarizedBudgetLogic.addSummarizedBudgetTrx(buildingId, sammarizedBudgetPayload, trx);

    const returnToRenderer = await this.getBudgetExecutionById(buildingId, date, returnedId[0], trx);

    trx.commit();

    return returnToRenderer[0];
  }

  prepareBudgetExecutionForAdd(date, summarized_section_id) {
    const {
      year,
      quarter
    } = date;

    const payload = {
      summarized_section_id,
      year,
      quarter,
      evaluation: 0.0,
      total_budget: 0.0,
      total_execution: 0.0,
      difference: 0.0,
      notes: null
    };

    const months = Helper.getQuarterMonths(quarter);

    months.forEach((month) => {
      payload[`${month}_budget`] = 0.0;
      payload[`${month}_budget_execution`] = 0.0;
    });

    return payload;
  }

  prepareSammarizedBudgetForAdd(date, summarized_section_id) {
    const {
      year
    } = date;

    const payload = {
      summarized_section_id,
      year,
      evaluation: 0.0,
      year_total_budget: 0.0,
      year_total_execution: 0.0,
      notes: null
    };

    for (let i = 1; i <= 4; i++) {
      payload[`quarter${i}_budget`] = 0.0;
      payload[`quarter${i}_execution`] = 0.0;
    }

    return payload;
  }

  async updateBudgetExecutionTrx({ buildingId = String, date = Object, summarized_section_id = Number, budgetExec = Object, special = false }, trx) {

    if (trx === undefined) {
      trx = await connectionPool.getTransaction();
    }

    //update budget execution
    await this.budgetExecutionDao.updateBudgetExecutionTrx(buildingId, date, summarized_section_id, budgetExec, trx);

    //get all budget executions
    const allBudgetExecutions = await this.getAllBudgetExecutionsTrx(buildingId, date, trx);

    //if a budget of specific month was updated
    //then month will exist
    if (date.month) {

      //dont update stats if it's a special code 
      //that starts with special prefix
      if (!special) {
        //calculate month stats
        const preparedMonthStatsObj = this.prepareMonthStatsObj(date.month, allBudgetExecutions);

        //update month stats
        await this.monthlyStatsLogic.updateMonthStatsTrx(buildingId, date, {
          outcome: preparedMonthStatsObj.outcome,
          income: preparedMonthStatsObj.income
        }, trx);

        //update quarter stats
        await this.quarterlyStatsLogic.updateQuarterStatsTrx(buildingId, date, {
          outcome: preparedMonthStatsObj.totalOutcome,
          income: preparedMonthStatsObj.totalIncome
        }, trx);
      }

    }

    //get budget execution after it was updated
    const budgetExecution = await this.getBudgetExecutionTrx(buildingId, date, summarized_section_id, trx);

    //get budget execution after it was updated
    const summarizedBudgetObj = await this.summarizedBudgetLogic.getSummarizedBudgetByIdTrx(summarized_section_id, buildingId, date, trx);

    const { total_budget, total_execution, evaluation } = budgetExecution[0];

    const preparedSumBudgetObj = this.prepareSummarizedBudgetObj(date.quarter, total_budget, total_execution, evaluation, summarizedBudgetObj[0]);

    //update summarized budget data
    await this.summarizedBudgetLogic.updateSummarizedBudgetTrx({ summarized_section_id, summarizedBudget: preparedSumBudgetObj, buildingId, date, special }, trx);

  }

  prepareSummarizedBudgetObj(quarter, totalBudget, totalExecution, evaluation, summarizedBudgetObj) {

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
      year_total_budget: total_budget,
      evaluation: summarizedBudgetObj[`evaluation`] + evaluation
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

  /**
   * creates empty report for the new budget execution table
   * @param {*} buildingId 
   * @param {*} date 
   */
  async createEmptyReport(buildingId, date, trx) {

    const registeredQuarter = await this.registeredQuartersLogic.getRegisteredQuarterTrx(buildingId, date.quarter, date.year, trx);

    //if the quarter is already registered
    //return empty promise
    if (registeredQuarter.length > 0) {
      return Promise.resolve([]);
    }

    const quarter = date.quarter > 1 ? date.quarter - 1 : 4;//if quarter is 0 then set to quarter 4 of previous year
    const year = quarter === 4 ? date.year - 1 : date.year;//if the quarter is 4, go to previous year

    //previous date
    const newDate = {
      quarter: quarter,
      year: year
    };

    // populate the budget execution table with sections data
    const defaultSections = await this.summarizedSectionsLogic.getAllSummarizedSectionsTrx(trx);
    const preparedDefaultSections = this.prepareDefaultBatchInsertion(defaultSections, date);
    await this.budgetExecutionDao.batchInsert(buildingId, date, preparedDefaultSections, trx);

    //all the months of a specific quarter
    const months = Helper.getQuarterMonthsHeb(date.quarter);

    //generate empty monthly stats (3 empty months)
    const monthlyStatsArr = this.generateEmptyMonthlyStats(months, date);

    // batch insert the months
    await this.monthlyStatsLogic.batchInsert(buildingId, monthlyStatsArr, trx);

    //register quarter
    await this.registeredQuartersLogic.registerNewQuarter(buildingId, { quarter: date.quarter, quarterHeb: date.quarterHeb, year: date.year }, trx);

    //call to create summarized budget report data
    await this.summarizedBudgetLogic.createEmptyReport(buildingId, date, trx);
  }

  generateEmptyMonthlyStats(months, date) {
    const data = [];
    //populate the array with empty month stats objects
    for (let i = 0; i < months.length; i++) {
      data.push({
        year: date.year,
        quarter: date.quarter,
        month: months[i],
        monthNum: Helper.hebToMonthNum(months[i]),
        income: 0,
        outcome: 0
      });
    }
    return data;
  }

  async deleteBudgetExecution({ buildingId, date, id }) {

    const quarterMonths = Helper.getQuarterMonths(date.quarter);

    const trx = await connectionPool.getTransaction();

    const budgetExecution = await this.getBudgetExecutionById(buildingId, date, id, trx);

    const { summarized_section_id } = budgetExecution[0];

    // loop through the quarter months
    await asyncForEach(quarterMonths, async (month) => {

      const newDate = {
        year: date.year,
        month: month
      };

      // fetch month expanses of the new date
      const monthExpanses = await this.monthExpansesDao.getMonthExpansesBySummarizedSectionIdTrx(
        buildingId,
        newDate,
        summarized_section_id,
        trx
      );

      // extract the ids of te month expanses
      // and put them in array
      await asyncForEach(monthExpanses, async (item) => {
        const payload = {
          linked: false
        }

        await this.monthExpansesDao.updateMonthExpanseTrx(buildingId, item.id, payload, trx);
      });

    });

    await this.budgetExecutionDao.deleteBudgetExecutionTrx(buildingId, date, id, trx);

    await this.summarizedBudgetDao.deleteBySummarizedSectionIdTrx(buildingId, date.year, summarized_section_id, trx);

    trx.commit();

  }

}



module.exports = BudgetExecutionLogic;