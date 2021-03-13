const Helper = require('../../helpers/Helper');
const SummarizedBudgetDao = require('../dao/SummarizedBudgetDao');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const QuarterlyStatsLogic = require('../logic/QuarterlyStatsLogic');
const YearlyStatsLogic = require('../logic/YearlyStatsLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const SummarizedSectionsLogic = require('../logic/SummarizedSectionsLogic');
const connectionPool = require('../connection/ConnectionPool');

class SummarizedBudgetLogic {

  constructor() {
    this.summarizedBudgetDao = new SummarizedBudgetDao();
    this.registeredYearsLogic = new RegisteredYearsLogic();
    this.quarterlyStatsLogic = new QuarterlyStatsLogic();
    this.yearlyStatsLogic = new YearlyStatsLogic();

    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic();
    this.summarizedSectionsLogic = new SummarizedSectionsLogic();
  }

  getBuildingSummarizedBudgetTrx(buildingName, date, trx) {
    return this.summarizedBudgetDao.getBuildingSummarizedBudgetTrx(buildingName, date, trx);
  }

  getAll(buildingName, date) {
    return this.summarizedBudgetDao.getAll(buildingName, date);
  }

  async getSummarizedBudgetsByRange(buildingName, date, range) {
    const data = await this.summarizedBudgetDao.getSummarizedBudgetsByRange(buildingName, date, range);
    const count = await this.summarizedBudgetDao.dataRowCount(buildingName, date);

    return {
      data,
      info: {
        count: count
      }
    }
  }

  getSummarizedBudgetByIdTrx(summarized_section_id, buildingName, date, trx) {
    return this.summarizedBudgetDao.getSummarizedBudgetByIdTrx(summarized_section_id, buildingName, date, trx);
  }

  addSummarizedBudgetTrx(buildingName = String, payload = Object, trx) {
    return this.summarizedBudgetDao.addSummarizedBudgetTrx(buildingName, payload, trx);
  }

  async updateSummarizedBudgetTrx({ summarized_section_id, summarizedBudget = Object, buildingNameEng = String, date = Object, special = false }, trx) {

    if (trx === undefined) {
      trx = await connectionPool.getTransaction();
    }

    await this.summarizedBudgetDao.updateSummarizedBudgetTrx(summarized_section_id, buildingNameEng, summarizedBudget, date, trx);

    const allSummarizedBudgets = await this.summarizedBudgetDao.getBuildingSummarizedBudgetTrx(buildingNameEng, date, trx);

    if (!special) {
      const yearStats = this.prepareYearStats(allSummarizedBudgets);

      //update year stats
      await this.yearlyStatsLogic.updateYearStatsTrx(buildingNameEng, date, {
        outcome: yearStats.year_total_execution,
        income: yearStats.year_total_budget
      }, trx);
    }

    //commit changes
    trx.commit();

    return Promise.resolve();

  }

  prepareYearStats(allSummarizedBudgets) {

    let year_total_execution = 0;
    let year_total_budget = 0;

    for (let i = 0; i < allSummarizedBudgets.length; i++) {

      if (allSummarizedBudgets[i].section !== "הכנסות מיוחדות" || allSummarizedBudgets[i].summarized_section_id !== 31) {
        year_total_execution += allSummarizedBudgets[i].year_total_execution;
        year_total_budget += allSummarizedBudgets[i].year_total_budget;
      }

    }

    return {
      year_total_execution,
      year_total_budget
    }

  }

  batchInsert(buildingName, rows, trx) {
    return this.summarizedBudgetDao.batchInsert(buildingName, rows, trx);
  }

  prepareDefaultBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].id,
        year: date.year
      })
    }
    return newData;
  }

  prepareBatchInsertion(data, date) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        summarized_section_id: data[i].summarized_section_id,
        year: date.year
      })
    }
    return newData;
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async createEmptyReport(buildingName, date, trx) {

    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    //if the year is already registered
    //return empty promise
    if (registeredYear.length > 0) {
      return Promise.resolve([]);
    }

    const newDate = {
      year: date.year - 1
    }

    //get all the budgets of the previous year if exists
    const sumBudgets = await this.getBuildingSummarizedBudgetTrx(buildingName, newDate, trx);

    if (sumBudgets.length === 0) {
      const defaultSections = await this.summarizedSectionsLogic.getAllSummarizedSectionsTrx(trx);
      //prepare the data for insertion
      const preparedDefaultSections = this.prepareDefaultBatchInsertion(defaultSections, date);
      //insert the batch
      await this.batchInsert(buildingName, preparedDefaultSections, trx);
    } else {
      //prepare the data for insertion
      const preparedSections = this.prepareBatchInsertion(sumBudgets, date);
      //insert the batch
      await this.batchInsert(buildingName, preparedSections, trx);
    }

    //generate empty quarterly stats (4 quarters)
    const quarterlyStatsArr = this.generateEmptyQuarterlyStats(date);

    // batch insert the quarters
    await this.quarterlyStatsLogic.batchInsert(buildingName, quarterlyStatsArr, trx);

    //insert empty month total row
    await this.yearlyStatsLogic.insertYearStatsTrx(buildingName, {
      year: date.year,
      income: 0,
      outcome: 0
    },
      trx);

    //register the new year
    await this.registeredYearsLogic.registerNewYear(buildingName, { year: date.year }, trx);
  }

  generateEmptyQuarterlyStats(date) {
    const data = [];
    //populate the array with empty month stats objects
    for (let i = 1; i < 5; i++) {
      data.push({
        year: date.year,
        quarter: i,
        income: 0,
        outcome: 0
      });
    }
    return data;
  }

}

module.exports = SummarizedBudgetLogic;