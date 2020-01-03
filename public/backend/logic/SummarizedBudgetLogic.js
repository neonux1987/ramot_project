const Helper = require('../../helpers/Helper');
const SummarizedBudgetDao = require('../dao/SummarizedBudgetDao');
const RegisteredYearsLogic = require('../logic/RegisteredYearsLogic');
const YearlyStatsLogic = require('../logic/YearlyStatsLogic');
const DefaultExpansesCodesLogic = require('../logic/DefaultExpansesCodesLogic');
const SummarizedSectionsLogic = require('../logic/SummarizedSectionsLogic');

class SummarizedBudgetLogic {

  constructor(connection) {
    this.connection = connection;
    this.sbd = new SummarizedBudgetDao(connection);
    this.registeredYearsLogic = new RegisteredYearsLogic(connection);
    this.yearlyStatsLogic = new YearlyStatsLogic(connection);
    this.defaultExpansesCodesLogic = new DefaultExpansesCodesLogic(connection);
    this.summarizedSectionsLogic = new SummarizedSectionsLogic(connection);
  }

  getBuildingSummarizedBudgetTrx(buildingName, date, trx) {
    return this.sbd.getBuildingSummarizedBudgetTrx(buildingName, date, trx);
  }

  getSummarizedBudgetsByRange(buildingName, date, range) {
    return this.sbd.getSummarizedBudgetsByRange(buildingName, date, range).then((data) => {
      return this.sbd.dataRowCount(buildingName, date).then((count) => {
        return {
          data,
          info: {
            count: count
          }
        }
      })
    });
  }

  getSummarizedBudgetByIdTrx(summarized_section_id, buildingName, date, trx) {
    return this.sbd.getSummarizedBudgetByIdTrx(summarized_section_id, buildingName, date, trx);
  }

  async updateSummarizedBudgetTrx({ summarized_section_id, summarizedBudget = Object, buildingName = String, date = Object, special = false }, trx) {

    if (trx === undefined) {
      trx = await this.connection.transaction();
    }

    await this.sbd.updateSummarizedBudgetTrx(summarized_section_id, buildingName, summarizedBudget, date, trx);

    const allSummarizedBudgets = await this.sbd.getBuildingSummarizedBudgetTrx(buildingName, date, trx);

    if (!special) {
      const yearStats = this.prepareYearStats(allSummarizedBudgets);

      //update year stats
      await this.yearlyStatsLogic.updateYearStatsTrx(buildingName, date, {
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
    return this.sbd.batchInsert(buildingName, rows, trx);
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

    if (trx === undefined) {
      trx = await this.connection.transaction()
    }

    const registeredYear = await this.registeredYearsLogic.getRegisteredYearTrx(buildingName, date.year, trx);

    //if the year is already registered
    //return empty promise
    if (registeredYear.length > 0) {
      trx.commit();
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

    //insert empty month total row
    await this.yearlyStatsLogic.insertYearStatsTrx(buildingName, {
      year: date.year,
      income: 0,
      outcome: 0
    },
      trx);

    //register the new year
    await this.registeredYearsLogic.registerNewYear(buildingName, { year: date.year }, trx);

    //get all the budgets of the previous year if exists
    const returnData = await this.getBuildingSummarizedBudgetTrx(buildingName, date, trx);

    trx.commit();

    return returnData;

  }

}

module.exports = SummarizedBudgetLogic;