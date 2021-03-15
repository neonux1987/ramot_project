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

  getBuildingSummarizedBudgetTrx(buildingNameEng, date, trx) {
    return this.summarizedBudgetDao.getBuildingSummarizedBudgetTrx(buildingNameEng, date, trx);
  }

  getAll(buildingNameEng, date) {
    return this.summarizedBudgetDao.getAll(buildingNameEng, date);
  }

  async getSummarizedBudgetsByRange(buildingNameEng, fromYear, toYear) {
    return this.summarizedBudgetDao.getSummarizedBudgetsByRange(buildingNameEng, fromYear, toYear);
  }

  getSummarizedBudgetByIdTrx(summarized_section_id, buildingNameEng, date, trx) {
    return this.summarizedBudgetDao.getSummarizedBudgetByIdTrx(summarized_section_id, buildingNameEng, date, trx);
  }

  addSummarizedBudgetTrx(buildingName = String, payload = Object, trx) {
    return this.summarizedBudgetDao.addSummarizedBudgetTrx(buildingNameEng, payload, trx);
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

  batchInsert(buildingNameEng, rows, trx) {
    return this.summarizedBudgetDao.batchInsert(buildingNameEng, rows, trx);
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
   * @param {*} buildingNameEng 
   * @param {*} date 
   */
  async createEmptyReport(buildingNameEng, date, trx) {

    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingNameEng, date.year, trx);

    //if the year is already registered
    //return empty promise
    if (registeredYear.length > 0) {
      return Promise.resolve([]);
    }

    const newDate = {
      year: date.year - 1
    }

    //get all the budgets of the previous year if exists
    const sumBudgets = await this.getBuildingSummarizedBudgetTrx(buildingNameEng, newDate, trx);

    if (sumBudgets.length === 0) {
      const defaultSections = await this.summarizedSectionsLogic.getAllSummarizedSectionsTrx(trx);
      //prepare the data for insertion
      const preparedDefaultSections = this.prepareDefaultBatchInsertion(defaultSections, date);
      //insert the batch
      await this.batchInsert(buildingNameEng, preparedDefaultSections, trx);
    } else {
      //prepare the data for insertion
      const preparedSections = this.prepareBatchInsertion(sumBudgets, date);
      //insert the batch
      await this.batchInsert(buildingNameEng, preparedSections, trx);
    }

    //generate empty quarterly stats (4 quarters)
    const quarterlyStatsArr = this.generateEmptyQuarterlyStats(date);

    // batch insert the quarters
    await this.quarterlyStatsLogic.batchInsert(buildingNameEng, quarterlyStatsArr, trx);

    //insert empty month total row
    await this.yearlyStatsLogic.insertYearStatsTrx(buildingNameEng, {
      year: date.year,
      income: 0,
      outcome: 0
    },
      trx);

    //register the new year
    await this.registeredYearsLogic.registerNewYear(buildingNameEng, { year: date.year }, trx);
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